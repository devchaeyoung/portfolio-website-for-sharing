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
<<<<<<< HEAD
        // console.log(userId);
        // const a = await UserModel.find({ id: userId });
        // console.log(a);
        // const ids = a.map(user => user._id);
        // console.log(ids);
        // const Education = await educationModel.find({ _id: { $eq: ids } });
        // return Education;
=======
>>>>>>> 64c2390c5f1d7d13e160547f245ce0fa5bdd1e35
        const education = await educationModel.find({author : userId});
        return education;
      }

      static async findById(educationId){
        const education = await educationModel.findOne({author : educationId});
        return education;
      }



<<<<<<< HEAD
    static async update(educationId,fieldToUpdate, newValue){
        const transformedUser = {
            ...educationId,
            _id: ObjectId(educationId.id)
        };
        const id = {id : transformedUser};
        const data = {[fieldToUpdate] : newValue};
        const updatedEducation = await educationModel.findOneAndUpdate(
            id,
            data,
        );
=======
    static async update(educationId, updateData){
        const updatedEducation = await educationModel.findOneAndUpdate({author : educationId},updateData);
>>>>>>> 64c2390c5f1d7d13e160547f245ce0fa5bdd1e35
        return updatedEducation;
    }

    static async delete(educationId){
        const deletedId = await educationModel.findOneAndDelete({author : educationId});
        return deletedId;
    }
    
}


export { Education };