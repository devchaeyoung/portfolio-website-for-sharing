import { crtfcModel } from "../schemas/crtfc";

class Crtfc{
    static async create(createCrtfc){
        const createdNewCrtfc = await crtfcModel.create(createCrtfc);
        return createdNewCrtfc;
    }

    static async findUser(userId) {
        const crtfc = await crtfcModel.find({ author : userId });
        return crtfc;
      }


    static async update(crtfcId, updateData) {
        const updatedCrtfc = await crtfcModel.findOneAndUpdate({ author : crtfcId }, updateData, {returnOriginal : false});
        return updatedCrtfc;
    }

    static async delete(crtfcId){
        const deletedId = await crtfcModel.findOneAndDelete({author : crtfcId});
        return deletedId;
    }


}


export {Crtfc};
