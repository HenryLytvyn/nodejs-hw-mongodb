import express, { json } from 'express';
import cors from 'cors';
import pino from 'pino-http';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import router from './routers/routers.js';
import cookieParser from 'cookie-parser';
import { APP_PORT, UPLOAD_DIR } from './constants.js';
import swaggerDocs from './middlewares/swaggerDocs.js';

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

  app.use('/api-docs', swaggerDocs());

  app.use(router);

  app.use('/uploads', express.static(UPLOAD_DIR));

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
  });
}
