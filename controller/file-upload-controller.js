const FileUpload = require("../model/file-upload");
const fs = require("fs-extra");

async function getHome(req, res) {
  const users = await FileUpload.fetchAll();
  res.render("profiles", { users });
}

async function getNewUser(req, res) {
  res.render("new-user");
}

async function postNewUser(req, res) {
  const fileUpload = new FileUpload(req.body.username, req.file.path);
  await fileUpload.insertOne();
  res.redirect("/");
}

async function getOneUser(req, res) {
  const fileUpload = new FileUpload(null, null, req.params.id);
  const user = await fileUpload.fetchOne();
  res.render("update-user", { user });
}

async function updateUser(req, res) {
  const fileUpload = new FileUpload(
    req.body.username,
    req.file.path,
    req.params.id
  );
  await fileUpload.updateOne();
  await fs.remove(`image_upload/${req.params.imagePath}`);
  res.redirect("/");
}

async function deleteUser(req, res) {
  const fileUpload = new FileUpload(null, null, req.params.id);
  await fileUpload.deleteOne();
  await fs.remove(`image_upload/${req.params.imagePath}`);
  res.redirect("/");
}

module.exports = {
  getHome,
  getNewUser,
  postNewUser,
  postNewUser,
  getOneUser,
  updateUser,
  deleteUser,
};
