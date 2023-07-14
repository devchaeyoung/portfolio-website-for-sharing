import { crtfcModel } from "../schemas/crtfc";
const { ObjectId } = require('mongoose').Types;

class Crtfc{
    static async create(newCrtfc){
        const createdNewCrtfc = await crtfcModel.create(newCrtfc);
        return createdNewCrtfc;
    }

    static async findUser(userId) {
        const crtfc = await crtfcModel.find({ author : userId});
        return crtfc;
      }

    static async findById(crtfcId) {
        const crtfc = await crtfcModel.findOne({author : crtfcId});
        return crtfc;
    }

    static async update(crtfcId, updateData) {
        const updatedCrtfc = await crtfcModel.findOneAndUpdate({ author : crtfcId }, updateData);
        return updatedCrtfc;
    }

    static async delete(crtfcId){
        const deletedId = await crtfcModel.findOneAndDelete({author : crtfcId});
        return deletedId;
    }


}


export {Crtfc};