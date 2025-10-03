import { Router } from 'express';
import {
  loginUserController,
  refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
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

authRouter.post('auth/refresh', refreshSessionController);

export default authRouter;
