import { EducationModel } from "../schemas/education";
const { ObjectId } = require("mongoose").Types;
class Education {
    static async create(newEducation) {
        const createdNewEducation = await EducationModel.create(newEducation);
        return createdNewEducation;
    }

    static async findByName(title) {
        console.log(title);
        const name = await EducationModel.findOne(title);
        console.log(name);
        return name;
    }
    static async findByMajor(Major) {
        const major = await EducationModel.findOne(Major);

        return major;
    }
    static async findByPresent(Crnt) {
        const crnt = await EducationModel.findOne(Crnt);
        return crnt;
    }

    // date예외처리필요

    // 수정필요
    static async findUser(userId) {
        const education = await EducationModel.find({ author: userId });
        return education;
    }

    static async findById(educationId) {
        const education = await EducationModel.findOne({ author: educationId });
        return education;
    }

    static async update(educationId, updateData) {
        const updatedEducation = await EducationModel.findOneAndUpdate(
            { author: educationId },
            updateData
        );
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
