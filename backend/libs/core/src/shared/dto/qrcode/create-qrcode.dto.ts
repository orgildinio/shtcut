import { IsMongoId, IsNotEmpty, IsOptional, IsString, IsObject, IsEnum, ValidateNested, IsArray, IsNumber } from '@nestjs/class-validator';
import { QrCodeProps } from '../../types';
import { Type } from 'class-transformer';

export enum QRCodeType {
  PDF = 'pdf',
  VCARD = 'vcard',
  WEBSITE = 'website',
  MULTI_LINK = 'multi-link'
}

class QRCodeColors {
  @IsString()
  background: string;

  @IsString()
  borderColor: string;

  @IsString()
  @IsOptional()
  btnColor?: string;

  @IsString()
  presetColor: string;
}

class EyeRadius {
  @IsNumber()
  outer: number;

  @IsNumber()
  inner: number;
}

class QRCodeProperties {
  @ValidateNested()
  @Type(() => QRCodeColors)
  colors: QRCodeColors;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EyeRadius)
  eyeRadius: EyeRadius[];

  @IsNumber()
  frame: number;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  qrStyle: string;

  @IsString()
  name: string;
}

class QrCodePropClass {
  public readonly value: string;
  public readonly bgColor?: string;
  public readonly patternColor?: string;
  public readonly fgColor?: string;
  public readonly logoImage?: string;
  public readonly eye_color_2_outer?: string;
  public readonly eye_color_0_outer?: string;
  public readonly eye_color_0_inner?: string;
  public readonly eye_color1_inner?: string;
  public readonly eye_color_2_Inner?: string;
  public readonly logoPadding?: string;
  public readonly logoWidth?: string;
  public readonly qrStyle?: string;
}

// Base DTO that others will extend
export class BaseQRCodeDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsString()
  bgColor: string;

  @ValidateNested()
  @Type(() => QRCodeProperties)
  qrCode: QRCodeProperties;
}

// PDF QR Code
export class PDFQRCodeDto extends BaseQRCodeDto {
  @IsString()
  @IsNotEmpty()
  file: string; // Base64 or file path
}

// vCard QR Code
class Address {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  zipCode: string;
}

class Company {
  @IsString()
  name: string;

  @IsString()
  department: string;
}

class Contacts {
  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  website?: string;
}

class SocialMedia {
  @IsString()
  @IsOptional()
  facebook?: string;

  @IsString()
  @IsOptional()
  instagram?: string;

  @IsString()
  @IsOptional()
  youtube?: string;
}

export class VCardQRCodeDto extends BaseQRCodeDto {
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @ValidateNested()
  @Type(() => Contacts)
  contacts: Contacts;

  @ValidateNested()
  @Type(() => SocialMedia)
  socialMedia: SocialMedia;
}

// Website QR Code
export class WebsiteQRCodeDto extends BaseQRCodeDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}

// Multi-link QR Code
class Link {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  title: string;

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  image?: string;
}

export class MultiLinkQRCodeDto extends BaseQRCodeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Link)
  links: Link[];

  @ValidateNested()
  @Type(() => SocialMedia)
  socialMedia: SocialMedia;
}

// Then use them in CreateQrCodeDto
export class CreateQrCodeDto {
  @IsEnum(QRCodeType)
  type: QRCodeType;

  @ValidateNested()
  @Type(() => BaseQRCodeDto, {
    discriminator: {
      property: 'type',
      subTypes: [
        { value: PDFQRCodeDto, name: QRCodeType.PDF },
        { value: VCardQRCodeDto, name: QRCodeType.VCARD },
        { value: WebsiteQRCodeDto, name: QRCodeType.WEBSITE },
        { value: MultiLinkQRCodeDto, name: QRCodeType.MULTI_LINK },
      ],
    },
  })
  data: PDFQRCodeDto | VCardQRCodeDto | WebsiteQRCodeDto | MultiLinkQRCodeDto;
}
