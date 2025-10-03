import { ONE_MONTH } from '../constants.js';
import { loginUser, refreshSession, registerUser } from '../services/auth.js';

export async function registerUserController(req, res, next) {
  const newUser = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: newUser,
  });
}

export async function loginUserController(req, res) {
  const session = await loginUser(req.body);

  await setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'User is successfully logged in!',
    data: { accessToken: session.accessToken },
  });
}

export async function refreshSessionController(req, res) {
  const session = await refreshSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  await setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
}

async function setupSession(res, session) {
  res.cookies('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
  res.cookies('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
}
