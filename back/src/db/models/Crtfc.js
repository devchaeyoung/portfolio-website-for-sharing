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


    static async update(userId, updateData) {
        const updatedCrtfc = await crtfcModel.findOneAndUpdate({ author : userId }, updateData, {returnOriginal : false});
        return updatedCrtfc;
    }

    static async delete(userId){
        const deletedId = await crtfcModel.findOneAndDelete({author : userId});
        return deletedId;
    }


}


export {Crtfc};
