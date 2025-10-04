import express, { json } from 'express';
import cors from 'cors';
import pino from 'pino-http';
import getEnvVar from './utils/getEnvVar.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import router from './routers/routers.js';
import cookieParser from 'cookie-parser';

const PORT = Number(getEnvVar('PORT', 3000));

export default async function setupServer() {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(
    json({
      type: ['application/json'],
    }),
  );

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
