import { crtfcModel } from "../schemas/crtfc";

class Crtfc {
  static async create(createCrtfc) {
    const createdNewCrtfc = await crtfcModel.create(createCrtfc);
    return createdNewCrtfc;
  }

  static async findUser(userId) {
    const crtfc = await crtfcModel.find({ author: userId });
    return crtfc;
  }

  static async findCrtfc(crtfcId) {
    const crtfc = await crtfcModel.findOne({ _id: crtfcId });
    return crtfc;
  }

  static async update(crtfcId, updateData) {
    const updatedCrtfc = await crtfcModel.findOneAndUpdate(
      { _id: crtfcId },
      updateData,
      { returnOriginal: false }
    );
    return updatedCrtfc;
  }

  static async delete(crtfcId) {
    const deletedId = await crtfcModel.findOneAndDelete({ _id: crtfcId });
    return deletedId;
  }
}

export { Crtfc };
