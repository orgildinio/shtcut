import { Controller, UseGuards } from '@nestjs/common';
import { AppController, Dict, JwtAuthGuard } from 'shtcut/core';
import { RoleService } from '../../services';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController extends AppController {
  constructor(
    protected service: RoleService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }
}
