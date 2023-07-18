const multer = require('multer');
const storage = require('./storage');
const FileAppender = require('./upload');

const upload = multer({ storage });

async function handleImageUpload(additionalReq, res, next) {
  const fileStrategy = 'VALUE';
  const appender = new FileAppender(fileStrategy, additionalReq);

  try {
    await new Promise((resolve, reject) => {
      upload.single('profileImage')(additionalReq, res, function (err) {
        if (err instanceof multer.MulterError) {
          return reject(err);
        } else if (err) {
          return reject(err);
        }

        const fileUrl = additionalReq.file.filename;
        console.log(fileUrl);

        appender.replacePlaceholder(additionalReq.file, {
          fieldname: additionalReq.file.fieldname,
          originalname: additionalReq.file.originalname,
          encoding: additionalReq.file.encoding,
          mimetype: additionalReq.file.mimetype,
          size: additionalReq.file.size,
          path: fileUrl
        });

        resolve();
      });
    });

    next();
  } catch (error) {
    next(error);
  }
}
  
  module.exports = { handleImageUpload };