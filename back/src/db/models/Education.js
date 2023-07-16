import { educationModel } from "../schemas/education";
class Education {
    static async create(createData){
        const createdNewEducation = await educationModel.create(createData);
        return createdNewEducation;
    }

    static async findUser(userId) {
        console.log(userId);
        console.log({author : userId});
        const education = await educationModel.find({author : userId});
        return education;
    }


    static async update(educationId, updateData){
        const updatedEducation = await educationModel.findOneAndUpdate({author : educationId},updateData, {returnOriginal : false});
        return updatedEducation;
    }

    static async delete(educationId) {
        const deletedId = await EducationModel.findOneAndDelete({
            author: educationId,
        });
        return deletedId;
    }
}

export { Education };
