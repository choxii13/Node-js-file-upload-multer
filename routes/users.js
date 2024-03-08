const express = require("express");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const multer = require("multer");
const fs = require("fs-extra");
const uuid = require("uuid");
const db = require("../data/database");
const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image_upload");
  },
  filename: function (req, file, cb) {
    cb(null, uuid.v1() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storageConfig });
const router = express.Router();

router.get("/", async function (req, res) {
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users });
});

router.get("/new-user", async function (req, res) {
  res.render("new-user");
});

router.post("/new-user", upload.single("image"), async function (req, res) {
  const imageFile = req.file;
  const name = req.body.username;
  await db
    .getDb()
    .collection("users")
    .insertOne({ name: name, imagePath: imageFile.path });
  res.redirect("/");
});

router.get("/:id", async function (req, res) {
  const user = await db
    .getDb()
    .collection("users")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.render("update-user", { user });
});

router.post(
  "/update-user/:id/image_upload/:path",
  upload.single("image"),
  async function (req, res) {
    const imageFile = req.file;
    await db
      .getDb()
      .collection("users")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { name: req.body.username, imagePath: imageFile.path } } // new path that will be saved
      );
    await fs.remove(`image_upload/${req.params.path}`); // old path that will be changed and deleted
    res.redirect("/");
  }
);

router.post("/delete/:id/image_upload/:imagePath", async function (req, res) {
  console.log(req.params.imagePath);
  await db
    .getDb()
    .collection("users")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  await fs.remove(`image_upload/${req.params.imagePath}`);
  res.redirect("/");
});

module.exports = router;
