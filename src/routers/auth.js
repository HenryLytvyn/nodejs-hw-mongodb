import { Router } from 'express';
import {
  getGoogleOAuthUrlController,
  loginUserController,
  loginWithGoogleController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  requestResetPasswordController,
  resetPasswordController,
} from '../controllers/auth.js';
import {
  loginUserValidationSchema,
  loginWithGoogleOAuthSchema,
  registerUserValidationSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import validateBody from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);

authRouter.post(
  '/auth/login',
  validateBody(loginUserValidationSchema),
  loginUserController,
);

authRouter.post('/auth/refresh', refreshSessionController);

authRouter.post('/auth/logout', logoutUserController);

authRouter.post(
  '/auth/send-reset-email',
  validateBody(requestResetEmailSchema),
  requestResetPasswordController,
);

authRouter.post(
  '/auth/reset-pwd',
  validateBody(resetPasswordSchema),
  resetPasswordController,
);

authRouter.get('/auth/get-oauth-url', getGoogleOAuthUrlController);

authRouter.post(
  '/auth/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  loginWithGoogleController,
);

export default authRouter;
