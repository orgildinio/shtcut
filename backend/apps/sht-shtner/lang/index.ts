import * as _ from 'lodash';
import { HttpException } from '@nestjs/common';
import { configuration } from '@config';
import { INTERNAL_SERVER_ERROR } from 'shtcut/core';

const language = configuration().app.lang;

/**
 * @param {Object} prop The password to compare against
 * @return {Object} return property
 */
function get(prop) {
  if (this.hasOwnProperty(prop)) return this[prop];
  else throw new HttpException(`There's no property defined as ${prop} in your translations`, INTERNAL_SERVER_ERROR);
}

const lang = {
  get,
  app: {
    success: 'Operation successful',
  },
  qrcodes: {
    created: 'QR code successfully created',
    updated: 'QR code successfully updated',
    deleted: 'QR code successfully deleted',
    retrieved: 'QR codes successfully retrieved',
    notFound: 'QR code not found',
    duplicate: 'QR code with this title already exists',
    invalidType: 'Invalid QR code type',
    validation: {
      titleRequired: 'Title is required',
      pdfRequired: 'PDF file is required',
      urlRequired: 'URL is required',
      companyRequired: 'Company name is required',
      contactsRequired: 'Email and phone are required',
      addressRequired: 'Address details are required',
      linksRequired: 'At least one link is required'
    }
  },
};

const obj = require(`./${language}`).default;
_.each(Object.getOwnPropertyNames(obj), function (property) {
  const prop = property;
  lang[prop] = Object.assign({}, obj[prop], { get });
});

export default lang;
