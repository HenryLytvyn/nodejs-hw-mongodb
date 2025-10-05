export default function validateBody(schema) {
  return async function validateBodyMiddleware(req, res, next) {
    await schema.validateAsync(req.body, { abortEarly: true });
    next();
  };
}

// import createHttpError from 'http-errors';

// export default function validateBody(schema) {
//   return async function (req, res, next) {
//     try {
//       await schema.validateAsync(req.body, { abortEarly: true });
//       next();
//     } catch (err) {
//       next(createHttpError(400, 'Bad request', { errors: err.details }));
//     }
//   };
// }
