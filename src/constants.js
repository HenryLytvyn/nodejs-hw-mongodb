import path from 'node:path';
import getEnvVar from './utils/getEnvVar.js';
import getEnvBool from './utils/getEnvBool.js';

// environment variables
export const APP_PORT = Number(getEnvVar('APP_PORT', 3000));
export const APP_DOMAIN = getEnvVar('APP_DOMAIN');

export const MONGODB_USER = getEnvVar('MONGODB_USER');
export const MONGODB_PASSWORD = getEnvVar('MONGODB_PASSWORD');
export const MONGODB_URL = getEnvVar('MONGODB_URL');
export const MONGODB_DB = getEnvVar('MONGODB_DB');

export const SMTP = {
  SMTP_HOST: getEnvVar('SMTP_HOST'),
  SMTP_PORT: getEnvVar('SMTP_PORT'),
  SMTP_USER: getEnvVar('SMTP_USER'),
  SMTP_PASSWORD: getEnvVar('SMTP_PASSWORD'),
  SMTP_FROM: getEnvVar('SMTP_FROM'),
};

export const JWT_SECRET = getEnvVar('JWT_SECRET');

export const CLOUDINARY = {
  CLOUD_NAME: getEnvVar('CLOUDINARY_NAME'),
  API_KEY: getEnvVar('CLOUDINARY_KEY'),
  API_SECRET: getEnvVar('CLOUDINARY_SECRET'),
};

export const ENABLE_CLOUDINARY = getEnvBool('ENABLE_CLOUDINARY');

export const GOOGLE_AUTH_CLIENT_ID = getEnvVar('GOOGLE_AUTH_CLIENT_ID');
export const GOOGLE_AUTH_CLIENT_SECRET = getEnvVar('GOOGLE_AUTH_CLIENT_SECRET');

// other variables
export const CONTACT_TYPE = {
  HOME: 'home',
  WORK: 'work',
  PERSONAL: 'personal',
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const PAGE_BY_DEFAULT = 1;
export const PER_PAGE_BY_DEFAULT = 10;
export const SORT_ORDER_DEFAULT = SORT_ORDER.ASC;
export const SORT_BY_DEFAULT = '_id';

export const FIFTEEN_MINUTES = 1000 * 60 * 15;
export const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uplouds');

export const photo = 'photo';
