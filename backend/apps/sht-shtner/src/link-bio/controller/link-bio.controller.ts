import { Controller, UseGuards } from '@nestjs/common';
import { AppController, JwtAuthGuard } from 'shtcut/core';
import { LinkBioService } from '../service/link-bio.service';
import { ConfigService } from '@nestjs/config';

@UseGuards(JwtAuthGuard)
@Controller('shtner/link-bios')
export class LinkBioController extends AppController {
  constructor(
    protected service: LinkBioService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }
}
