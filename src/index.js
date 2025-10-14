import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants.js';
import initMongoConnection from './db/initMongoConnection.js';
import setupServer from './server.js';
import { createDirIfNotExist } from './utils/createDirIfNotExist.js';

await createDirIfNotExist(TEMP_UPLOAD_DIR);
await createDirIfNotExist(UPLOAD_DIR);
await initMongoConnection();
setupServer();
