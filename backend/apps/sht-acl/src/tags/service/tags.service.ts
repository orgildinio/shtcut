import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dict, MongoBaseService, Pagination, QueryParser, Tag, TagDocument } from 'shtcut/core';
import { Model } from 'mongoose';
import * as _ from 'lodash';
import { Request } from 'express';

@Injectable()
export class TagService extends MongoBaseService {
  constructor(@InjectModel(Tag.name) protected model: Model<TagDocument>) {
    super(model);
  }

  public async buildModelQueryObject(pagination: Pagination, queryParser: QueryParser, req?: Request) {
    queryParser.query.user = req.user['_id'];
    return super.buildModelQueryObject(pagination, queryParser, req);
  }
}
