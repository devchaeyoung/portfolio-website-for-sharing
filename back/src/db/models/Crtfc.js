import { crtfcModel } from "../schemas/crtfc";
const { ObjectId } = require("mongodb");

class Crtfc {
  static async create(newCrtfc) {
    const createdNewCrtfc = await crtfcModel.create(newCrtfc);
    return createdNewCrtfc;
  }

  static async findUser(userId) {
    const crtfc = await crtfcModel.find({ id: userId });
    return crtfc;
  }

  static async findById(crtfcId) {
    const crtfc = await crtfcModel.findOne({ id: crtfcId });
    return crtfc;
  }

  static async update(crtfcId, fieldToUpdate, newValue) {
    const transformedUser = {
      ...crtfcId,
      _id: ObjectId(crtfcId.id),
    };
    const id = { crtfcId: transformedUser };
    const data = { [fieldToUpdate]: newValue };
    const updatedCrtfc = await crtfcModel.findOneAndUpdate(id, data);
    return updatedCrtfc;
  }
}

export { Crtfc };
