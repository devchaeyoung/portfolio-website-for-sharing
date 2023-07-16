import { Crtfc } from "../db/models/Crtfc";

class crtfcAuthService {
  static async addCrtfc(title, licence, issuedDate, issuer, langscore, author) {
    const newCrtfc = { title, licence, issuedDate, issuer, langscore, author };

    const createdNewCrtfc = await Crtfc.create(newCrtfc);
    // createdNewCrtfc.errorMessage = null;
    return createdNewCrtfc;
  }

  static async getCrtfc(userId) {
    const user = await Crtfc.findUser(userId);
    return user;
  }

  static async setCrtfc(crtfcId, { toUpdate }) {
    let userCrtfc = await Crtfc.findById(crtfcId);

    if (!userCrtfc) {
      const errorMessage = "다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    userCrtfc = await Crtfc.update(crtfcId, toUpdate);
    return userCrtfc;
  }

  static async deleteCrtfc(crtfcId) {
    const deletedCrtfc = await Crtfc.delete(crtfcId);
    return deletedCrtfc;
  }
}

export { crtfcAuthService };
