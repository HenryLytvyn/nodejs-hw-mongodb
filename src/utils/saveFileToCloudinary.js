import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { CLOUDINARY } from '../constants.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
});

export default async function saveFileToCloudinary(file) {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
}
