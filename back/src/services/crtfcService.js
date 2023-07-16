import { Crtfc } from "../db/models/Crtfc";

class crtfcAuthService {
  static async addCrtfc({ toCreate }) {
    const createdNewCrtfc = await Crtfc.create(toCreate);
    // createdNewCrtfc.errorMessage = null;
    return createdNewCrtfc;
  }
  static async getCrtfc(userId) {
    const user = await Crtfc.findUser(userId);
    return user;
  }

  static async setCrtfc(crtfcId, { toUpdate }) {
    let CrtfcId = await Crtfc.findCrtfc(crtfcId);

    if (!CrtfcId) {
      const errorMessage = "다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const updatedCrtfc = await Crtfc.update(crtfcId, toUpdate);
    return updatedCrtfc;
  }

  static async deleteCrtfc(crtfcId) {
    const deletedCrtfc = await Crtfc.delete(crtfcId);
    return deletedCrtfc;
  }
}

export { crtfcAuthService };
