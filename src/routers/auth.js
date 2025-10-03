import { Router } from 'express';
import { registerUserController } from '../controllers/auth.js';
import { registerUserValidationSchema } from '../validation/auth.js';
import validateBody from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(registerUserValidationSchema),
  registerUserController,
);

export default authRouter;
