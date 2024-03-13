const uuid = require("uuid");
const multer = require("multer");

function storageConfig() {
  const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "image_upload");
    },
    filename: function (req, file, cb) {
      cb(null, uuid.v1() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storageConfig });
  return upload;
}

module.exports = storageConfig;
