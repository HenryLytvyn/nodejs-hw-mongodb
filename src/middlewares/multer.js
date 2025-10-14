import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqutSufix = Date.now();
    cb(null, `${uniqutSufix}_${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
