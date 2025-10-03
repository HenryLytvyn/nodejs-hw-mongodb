import bcrypt from 'bcrypt';
import UsersCollection from '../db/models/user.js';
import createHttpError from 'http-errors';

export async function registerUser(payload) {
  const isUserExist = await UsersCollection.findOne({ email: payload.email });
  if (isUserExist) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
}
