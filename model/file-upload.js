const mongodb = require("mongodb");
const { ObjectId } = mongodb;
const db = require("../data/database");

class FileUpload {
  constructor(name, imagePath, id) {
    (this.name = name), (this.imagePath = imagePath);
    if (id) {
      this.id = new ObjectId(id);
    }
  }

  static async fetchAll() {
    const users = await db.getDb().collection("users").find().toArray();
    return users;
  }

  async insertOne() {
    const insertedData = await db
      .getDb()
      .collection("users")
      .insertOne({ name: this.name, imagePath: this.imagePath });
    return insertedData;
  }

  async fetchOne() {
    const user = await db.getDb().collection("users").findOne({ _id: this.id });
    return user;
  }

  async updateOne() {
    const updatedData = await db
      .getDb()
      .collection("users")
      .updateOne(
        { _id: this.id },
        { $set: { name: this.name, imagePath: this.imagePath } } // new path that will be saved
      );
    return updatedData;
  }

  async deleteOne() {
    const deletedData = await db
      .getDb()
      .collection("users")
      .deleteOne({ _id: this.id });
    return deletedData;
  }
}

module.exports = FileUpload;
