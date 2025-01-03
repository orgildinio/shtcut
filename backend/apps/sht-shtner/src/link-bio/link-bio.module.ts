import { Module } from '@nestjs/common';
import { LinkBioController } from './controller/link-bio.controller';
import { LinkBioService } from './service/link-bio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkBio, LinkBioSchema } from 'shtcut/core';

@Module({
  imports: [MongooseModule.forFeature([{ name: LinkBio.name, schema: LinkBioSchema }])],
  controllers: [LinkBioController],
  providers: [LinkBioService],
  exports: [LinkBioService],
})
export class LinkBioModule {}
