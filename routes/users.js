const express = require("express");
const fileUploadController = require("../controller/file-upload-controller");

const storageConfig = require("../config/file-upload-config");
const upload = storageConfig();
const router = express.Router();

router.get("/", fileUploadController.getHome);
router.get("/new-user", fileUploadController.getNewUser);

router.post(
  "/new-user",
  upload.single("image"),
  fileUploadController.postNewUser
);

router.get("/:id", fileUploadController.getOneUser);

router.post(
  "/update-user/:id/image_upload/:imagePath",
  upload.single("image"),
  fileUploadController.updateUser
);

router.post(
  "/delete/:id/image_upload/:imagePath",
  fileUploadController.deleteUser
);

module.exports = router;
