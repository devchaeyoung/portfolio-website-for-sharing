import { educationModel } from "../schemas/education";
const { ObjectId } = require('mongoose').Types;
class Education {
    static async create(newEducation){
        const createdNewEducation = await educationModel.create(newEducation);
        return createdNewEducation;
    }

    static async findByName( title ) {
        console.log(title);
        const name = await educationModel.findOne(title);
        console.log(name);
        return name;
    }
    static async findByMajor( Major ) {
        const major = await educationModel.findOne( Major);

        return major;
    }
    static async findByPresent( Crnt ) {
        const crnt = await educationModel.findOne( Crnt );
        return crnt;
    }

    // date예외처리필요
    
    // 수정필요
    static async findUser(userId) {
        const education = await educationModel.find({author : userId});
        return education;
      }

      static async findById(educationId){
        const education = await educationModel.findOne({author : educationId});
        return education;
      }



    static async update(educationId, updateData){
        const updatedEducation = await educationModel.findOneAndUpdate({author : educationId},updateData);
        return updatedEducation;
    }

    static async delete(educationId){
        const deletedId = await educationModel.findOneAndDelete({author : educationId});
        return deletedId;
    }
    
}


export { Education };
