import { Crtfc } from "../db/models/Crtfc";

class crtfcAuthService {
  static async addCrtfc({toCreate}) {

    const createdNewCrtfc = await Crtfc.create(toCreate);
    // createdNewCrtfc.errorMessage = null;
    return createdNewCrtfc;
  }
  static async getCrtfc(userId) {
    const user = await Crtfc.findUser(userId);
    return user;
}

  static async setCrtfc(userId, {toUpdate}){
        let userCrtfc = await Crtfc.findUser(userId);

        if (!userCrtfc) {
            const errorMessage =
              "다시 한 번 확인해 주세요.";
            return { errorMessage };
          }

        const updatedCrtfc = await Crtfc.update(userId, toUpdate);
        return updatedCrtfc;
    }

    static async deleteCrtfc(userId){
        const deletedCrtfc = await Crtfc.delete(userId);
        return deletedCrtfc;
    }

}




export {crtfcAuthService};
