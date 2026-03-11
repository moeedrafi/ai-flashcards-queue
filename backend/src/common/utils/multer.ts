import { diskStorage } from 'multer';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const originalName = file.originalname.replace(/\s+/g, '-');
      const filename = `${uniqueSuffix}-${originalName}`;
      callback(null, filename);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
};
