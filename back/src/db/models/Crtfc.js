import { crtfcModel } from "../schemas/crtfc";

class Crtfc{
    static async create({newCrtfc}){
        console.log(newCrtfc);
        const createdNewCrtfc = await crtfcModel.create(createdNewCrtfc);
        return createdNewCrtfc;
    }

    static async findUser(userId) {
        const crtfc = await crtfcModel.find({author : userId});
        return crtfc;
      }

    static async findById({crtfcId}) {
        const crtfc = await crtfcModel.findOne({ crtfcId: crtfcId });
        return crtfc;
    }

    static async update(crtfcId,fieldToUpdate, newValue){
        const id = {crtfcId : crtfcId};
        const data = {[fieldToUpdate] : newValue};
        const updatedCrtfc = await crtfcModel.findOneAndUpdate(
            id,
            data,
        );
        return updatedCrtfc;
    }
}


export{Crtfc};