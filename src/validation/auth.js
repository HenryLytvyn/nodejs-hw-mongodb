import Joi from 'joi';

const joiPassword = Joi.string().min(6).max(16).required();
const joiEmail = Joi.string().email().required();

export const registerUserValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: joiEmail,
  password: joiPassword,
});

export const loginUserValidationSchema = Joi.object({
  email: joiEmail,
  password: joiPassword,
});

export const requestResetEmailSchema = Joi.object({
  email: joiEmail,
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: joiPassword,
});
