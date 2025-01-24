import { Body, Controller, Get, HttpCode, Next, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AppController, CreateLinkDto, JwtAuthGuard, NOT_FOUND, OK, QueryParser, UpdateLinkDto } from 'shtcut/core';
import { LinkService } from '../service/link.service';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';

@Controller('links')
export class LinkController extends AppController {
  constructor(
    protected service: LinkService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @Get('/visit/:domain/:alias')
  @HttpCode(OK)
  public async visit(
    @Param('domain') domain: string,
    @Param('alias') alias: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const link = await this.service.visit(req, domain, alias);
      let response = null;
      if (!link) {
        response = await this.service.getResponse({
          code: NOT_FOUND,
          value: this.lang.notFound,
        });
        return res.status(NOT_FOUND).json(response);
      }
      response = await this.service.getResponse({
        code: OK,
        value: link,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Get('/:id/analytics')
  @HttpCode(OK)
  public async analytics(
    @Param('id') id: string,
    @Param('alias') alias: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return res.status(OK).json({});
    } catch (e) {
      return next(e);
    }
  }

  @Post('/:alias/password')
  @HttpCode(OK)
  public async linkPassword(
    @Param('alias') alias: string,
    @Body() payload: { password: string },
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const link = await this.service.linkPassword(req, alias, payload.password);
      const response = await this.service.getResponse({
        code: OK,
        value: _.omit(link, ['password']),
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Get('/metadata')
  @HttpCode(OK)
  public async urlMetaData(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));
      const data = await this.service.urlMetadata(queryParser.query.url);
      const response = await this.service.getResponse({
        code: OK,
        value: data,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Post('/')
  @HttpCode(OK)
  public async create(
    @Body() payload: CreateLinkDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.create(payload, req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @HttpCode(OK)
  public async update(
    @Param('id') id: string,
    @Body() payload: UpdateLinkDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.update(id, payload, req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @HttpCode(OK)
  public async patch(
    @Param('id') id: string,
    @Body() payload: UpdateLinkDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.patch(id, payload, req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/duplicate')
  @HttpCode(OK)
  async duplicateService(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.service.duplicateObject(id);
      const response = await this.service.getResponse({
        code: OK,
        message: this.lang.created,
        value,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Post('/archived/many')
  @HttpCode(OK)
  public async archivedMany(@Body() payload: { ids: string[] }, @Req() req, @Res() res, @Next() next: NextFunction) {
    try {
      const objects: any = await this.service.archivedMany(payload);
      const response = await this.service.getResponse({
        code: OK,
        value: {
          ids: objects,
        },
      });
      return res.status(OK).json(response);
    } catch (err) {
      next(err);
    }
  }
}
