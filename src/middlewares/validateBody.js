export default function validateBody(schema) {
  return async function validateBodyMiddleware(req, res, next) {
    await schema.validateAsync(req.body, { abortEarly: true });
    next();
  };
}
