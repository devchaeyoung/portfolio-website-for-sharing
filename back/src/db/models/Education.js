import { EducationModel } from "../schemas/education";
class Education {
    static async create(createData){
        console.log(createData);
        const createdNewEducation = await EducationModel.create(createData);
        return createdNewEducation;
    }
    

    static async findUser(userId) {
        console.log(userId);
        console.log({author : userId});
        const education = await EducationModel.find({author : userId});
        return education;
    }


    static async update(userId, updateData){
        const updatedEducation = await EducationModel.findOneAndUpdate({author : userId},updateData, {returnOriginal : false});
        return updatedEducation;
    }

    static async delete(userId) {
        const deletedId = await EducationModel.findOneAndDelete({
            author: userId,
        });
        return deletedId;
    }
}

export { Education };
