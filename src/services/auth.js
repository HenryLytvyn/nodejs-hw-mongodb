import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import UsersCollection from '../db/models/user.js';
import createHttpError from 'http-errors';
import {
  APP_DOMAIN,
  FIFTEEN_MINUTES,
  JWT_SECRET,
  ONE_MONTH,
  SMTP,
} from '../constants.js';
import SessionsCollection from '../db/models/session.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

export async function registerUser(payload) {
  const isUserExist = await UsersCollection.findOne({ email: payload.email });
  if (isUserExist) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  return user;
}

export async function loginUser(payload) {
  const user = await UsersCollection.findOne({
    email: payload.email,
  });
  if (!user) throw createHttpError(401, 'Wrong email or password');

  const isPasswordEqual = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordEqual) throw createHttpError(401, 'Unauthorized');

  await SessionsCollection.findOneAndDelete(user._id);

  return await createSession(user._id);
}

export async function refreshSession({ sessionId, refreshToken }) {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) throw createHttpError(401, 'Session not found');

  const isRefreshTokenValid = new Date() < session.refreshTokenValidUntil;
  if (!isRefreshTokenValid) {
    await deleteSession(sessionId);
    throw createHttpError(401, 'refresh token expired');
  }

  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    await deleteSession(sessionId);
    throw createHttpError(401, 'user not found');
  }

  await SessionsCollection.findByIdAndDelete(sessionId);

  const newSession = await createSession(user._id);

  return newSession;
}

export async function createSession(userId) {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_MONTH);

  const session = await SessionsCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return session;
}

export async function deleteSession(sessionId) {
  const isSessionExist = await SessionsCollection.findById(sessionId);
  if (!isSessionExist) throw createHttpError(401, 'Session not found');

  await SessionsCollection.findByIdAndDelete(sessionId);
}

export async function logoutUser(sessionId) {
  await deleteSession(sessionId);
}

export async function requestResetToken(email) {
  const user = await UsersCollection.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found');

  const resetPasswordToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    JWT_SECRET,
    { expiresIn: '5m' },
  );

  await sendEmail({
    from: SMTP.SMTP_FROM,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="http://${APP_DOMAIN}/reset-password?token=${resetPasswordToken}">here</a> to reset your password</p>`,
  });
}

export async function resetPassword({ token, password }) {
  let entries;

  try {
    entries = jwt.verify(token, JWT_SECRET);
  } catch {
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  const user = await UsersCollection.findOne({
    _id: entries.sub,
    email: entries.email,
  });

  if (!user) throw createHttpError(404, 'User not found!');

  const encryptedPassword = await bcrypt.hash(password, 10);

  const updateData = await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );

  if (updateData.modifiedCount !== 1) {
    throw createHttpError(500, 'Error server. Please try later');
  }

  await SessionsCollection.findOneAndDelete({ userId: user._id });
}
