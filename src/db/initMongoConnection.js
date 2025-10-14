import mongoose from 'mongoose';
import {
  MONGODB_DB,
  MONGODB_PASSWORD,
  MONGODB_URL,
  MONGODB_USER,
} from '../constants.js';

export default async function initMongoConnection() {
  try {
    const user = MONGODB_USER;
    const pwd = MONGODB_PASSWORD;
    const url = MONGODB_URL;
    const db = MONGODB_DB;

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('MongoDB connected');
  } catch (err) {
    console.log('MongoDB connection failed', err);
  }
}
