import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-shtner/lang';
import { ClientSession, Model } from 'mongoose';
import {
  AppException,
  Dict,
  Hit,
  HitDocument,
  IpService,
  Link,
  LinkDocument,
  MongoBaseService,
  QrCode,
  QrCodeDocument,
  RedisService,
  Utils,
  QRCodeType,
  CreateQrCodeDto,
  PDFQRCodeDto,
  VCardQRCodeDto,
  WebsiteQRCodeDto,
  MultiLinkQRCodeDto
} from 'shtcut/core';

import { HitService } from '../../hit';
import * as _ from 'lodash';
import { Request } from 'express';

@Injectable()
export class QrCodeService extends MongoBaseService {
  protected lang = lang;

  constructor(
    @InjectModel(QrCode.name) protected model: Model<QrCodeDocument>,
    @InjectModel(Hit.name) protected hitModel: Model<HitDocument>,
    @InjectModel(Link.name) protected linkModel: Model<LinkDocument>,
    protected hitService: HitService,
    protected ipService: IpService,
    protected redisService: RedisService,
  ) {
    super(model, redisService);
  }

  public async validateCreate(obj: Dict): Promise<any> {
    try {
      const { type, data } = obj;

      if (!type || !data) {
        return new AppException(400, this.lang.get('qrcodes').validation.typeRequired);
      }

      // Common validations for all types
      if (!data.title) {
        return new AppException(400, this.lang.get('qrcodes').validation.titleRequired);
      }

      if (!data.qrCode) {
        return new AppException(400, 'QR code properties are required');
      }

      // Type-specific validations
      switch (type) {
        case QRCodeType.PDF:
          if (!data.file) {
            return new AppException(400, 'PDF file is required');
          }
          break;

        case QRCodeType.VCARD:
          if (!data.company?.name) {
            return new AppException(400, 'Company name is required');
          }
          if (!data.contacts?.email || !data.contacts?.phone) {
            return new AppException(400, 'Email and phone are required');
          }
          if (!data.address?.street || !data.address?.city || !data.address?.country) {
            return new AppException(400, 'Address details are required');
          }
          break;

        case QRCodeType.WEBSITE:
          if (!data.url) {
            return new AppException(400, 'URL is required');
          }
          // Optional: Add URL format validation
          break;

        case QRCodeType.MULTI_LINK:
          if (!data.links || !Array.isArray(data.links) || data.links.length === 0) {
            return new AppException(400, this.lang.get('qrcodes').validation.linksRequired);
          }
          // Validate each link
          for (const link of data.links) {
            if (!link.url || !link.title) {
              return new AppException(400, 'Each link must have a URL and title');
            }
          }
          break;

        default:
          return new AppException(400, 'Invalid QR code type');
      }

      return null; // All validations passed
    } catch (error) {
      return error;
    }
  }

  public async prepareBodyObject(req: Request): Promise<any> {
    const payload = req.body;

    // Just generate the slug from title
    if (payload.data.title) {
      payload.title = payload.data.title;  // Move title to root level
      payload.slug = Utils.slugifyText(payload.data.title);
    }

    return payload;
  }

  public async createNewObject(obj: Dict, session?: ClientSession): Promise<any> {
    try {
      if (obj.type) {
        const { type, data } = obj as CreateQrCodeDto;
        let qrContent: string;

        switch (type) {
          case QRCodeType.PDF:
            qrContent = this.generatePDFQRContent(data as PDFQRCodeDto);
            break;
          case QRCodeType.VCARD:
            qrContent = this.generateVCardQRContent(data as VCardQRCodeDto);
            break;
          case QRCodeType.WEBSITE:
            qrContent = this.generateWebsiteQRContent(data as WebsiteQRCodeDto);
            break;
          case QRCodeType.MULTI_LINK:
            qrContent = this.generateMultiLinkQRContent(data as MultiLinkQRCodeDto);
            break;
          default:
            throw new Error('Unsupported QR code type');
        }

        return super.createNewObject({
          target: qrContent,
          properties: data.qrCode,
          title: data.title,
          description: data.description,
          type: type,
          bgColor: data.bgColor,
          profileImage: data.profileImage,
        }, session);
      }
      return super.createNewObject(obj, session);
    } catch (error) {
      throw error;
    }
  }

  public updateObject(id: string, obj: Dict, session?: ClientSession) {
    if (obj.title) obj.slug = Utils.slugifyText(obj.title);
    return super.updateObject(id, obj, session);
  }

  public async visit(req: Request, id: string) {
    try {
      const qrCode = await this.model.findOne({ ...Utils.conditionWithDelete({ _id: id }) });
      if (!qrCode) {
        return null;
      }

      const ipAddressInfo = await this.ipService.getClientIpInfo(req);

      if (qrCode.enableTracking) {
        const payload = {
          user: qrCode.user,
          ...ipAddressInfo,
        };

        await this.hitModel.findOneAndUpdate(
          { qrcode: qrCode._id },
          {
            ...payload,
            lastClicked: payload.timezone.currentTime ?? Date.now(),
            $inc: { clicks: 1 },
          },
          {
            ...Utils.mongoDefaultUpdateProps(),
          },
        );
      }

      // Increment click count and save qrcode
      qrCode.totalScanned += 1;
      return await qrCode.save();
    } catch (e) {
      throw e;
    }
  }

  /**
   * The function ensures that a domain exists and throws an exception if it does not.
   * @param domain - The `domain` parameter is a variable that represents a domain name.
   */
  private ensureDomainExists(domain) {
    if (!domain) {
      throw AppException.NOT_FOUND(lang.get('domain').notFound);
    }
  }

  /**
   * The function checks if a domain is verified and throws an exception if it is not.
   * @param domain - The "domain" parameter is an object that represents a domain. It likely contains
   * information about the domain, such as its name, owner, and verification status.
   */
  private checkDomainVerification(domain) {
    const { verification } = domain;
    if (!verification.verified) {
      throw AppException.NOT_FOUND(lang.get('domain').notVerified);
    }
  }

  /**
   * This TypeScript function deletes an object and its associated QR code link within a transaction
   * using MongoDB sessions.
   * @param {string} id - The `id` parameter in the `deleteObject` function is a string that represents
   * the unique identifier of the object you want to delete. This identifier is used to locate and
   * delete the corresponding object from the database.
   * @returns The `deleteObject` method is returning the result of deleting the object with the
   * specified id.
   */
  public async deleteObject(id: string) {
    let session: ClientSession;
    try {
      session = await this.model.startSession();
      session.startTransaction();
      const [qrCode, _] = await Promise.all([
        await this.model.deleteOne({ ...Utils.conditionWithDelete({ _id: id }) }, { session }),
        await this.linkModel.deleteOne({ ...Utils.conditionWithDelete({ qrCode: id }) }, { session }),
      ]);
      await session?.commitTransaction();
      return qrCode;
    } catch (e) {
      await session?.abortTransaction();
      throw e;
    } finally {
      await session?.endSession();
    }
  }

  public async bulkDelete(ids: string[]) {
    try {
      // Input validation
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new BadRequestException('Please provide valid QR code IDs');
      }

      // Verify all QR codes exist and are accessible
      const existingQrCodes = await this.model.find({
        _id: { $in: ids },
        ...Utils.conditionWithDelete({})
      });

      if (existingQrCodes.length !== ids.length) {
        throw new BadRequestException('Some QR codes were not found or are already deleted');
      }

      // Delete QR codes only
      const deletedQrCodes = await this.model.deleteMany(
        { ...Utils.conditionWithDelete({ _id: { $in: ids } }) }
      );

      return {
        deletedCount: deletedQrCodes.deletedCount,
        message: `Successfully deleted ${deletedQrCodes.deletedCount} QR codes`
      };
    } catch (e) {
      throw e;
    }
  }

  private generatePDFQRContent(data: PDFQRCodeDto): string {
    // Generate content for PDF QR code
    return `PDF:${data.file}`;
  }

  private generateVCardQRContent(data: VCardQRCodeDto): string {
    // Generate vCard format string
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${data.title}`,
      `ORG:${data.company.name}`,
      `TITLE:${data.company.department}`,
      `EMAIL:${data.contacts.email}`,
      `TEL:${data.contacts.phone}`,
      `ADR:;;${data.address.street};${data.address.city};${data.address.state};${data.address.zipCode};${data.address.country}`,
      `URL:${data.contacts.website || ''}`,
      'END:VCARD'
    ].join('\n');
    return vcard;
  }

  private generateWebsiteQRContent(data: WebsiteQRCodeDto): string {
    return data.url;
  }

  private generateMultiLinkQRContent(data: MultiLinkQRCodeDto): string {
    // Create a JSON structure or formatted string for multiple links
    const content = {
      links: data.links,
      social: data.socialMedia
    };
    return JSON.stringify(content);
  }

  public async postCreate(data: { queryParser: any; value: any; code: number; message?: string }) {
    return {
      code: data.code,
      value: data.value,
      message: data.message ?? this.lang.get('qrcodes').created
    };
  }
}
