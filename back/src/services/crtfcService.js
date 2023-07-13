import { Crtfc } from "../db/models/Crtfc";


class crtfcAuthService{
    static async addCrtfc(title,licence,issuedDate,issuer, langscore,author){

        const newCrtfc = {title,licence,issuedDate,issuer, langscore,author};
        console.log(newCrtfc);
        const createdNewCrtfc = await Crtfc.create(newCrtfc);
        // createdNewCrtfc.errorMessage = null;
        return createdNewCrtfc;
    }

    static async getCrtfc(userId){
        const user = await Crtfc.findUser(userId);
        return user;
    }

    static async setCrtfc({crtfcId, toUpdate}){

        let userCrtfc = await Crtfc.findById(crtfcId);

        if (!userCrtfc) {
            const errorMessage =
              "다시 한 번 확인해 주세요.";
            return { errorMessage };
          }
        if (toUpdate.title){
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            userCrtfc = await Crtfc.update(crtfcId,fieldToUpdate,newValue);
        }
        if (toUpdate.licence){
            const fieldToUpdate = "licence";
            const newValue = toUpdate.licence;
            userCrtfc = await Crtfc.update(crtfcId,fieldToUpdate,newValue);
        }
        if (toUpdate.issuedDate){
            const fieldToUpdate = "sissuedDate";
            const newValue = toUpdate.issuedDate;
            userCrtfc = await Crtfc.update(crtfcId,fieldToUpdate,newValue);
        }
        if (toUpdate.issuer){
            const fieldToUpdate = "issuer";
            const newValue = toUpdate.issuer;
            userCrtfc = await Crtfc.update(crtfcId,fieldToUpdate,newValue);
        }
        if (toUpdate.langscore){
            const fieldToUpdate = "langscore";
            const newValue = toUpdate.langscore;
            userCrtfc = await Crtfc.update(crtfcId,fieldToUpdate,newValue);
        }

        return userCrtfc;
    }
}


export {crtfcAuthService};