import { educationModel } from "../schemas/education";
const { ObjectId } = require('mongodb');
class Education {
    static async create(newEducation){
        const createdNewEducation = await educationModel.create(newEducation);
        return createdNewEducation;
    }

    static async findByName( schoolName ) {
        const name = await educationModel.findOne(schoolName);
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
    static async findUser(userId) {
        const education = await educationModel.find({ id : userId});
        return education;
      }

    static async findById(educationId) {
        const education = await educationModel.findOne({ id : educationId });
        return education;
    }



    static async    update(educationId,fieldToUpdate, newValue){
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
        return updatedEducation;
    }
    
}


export { Education };