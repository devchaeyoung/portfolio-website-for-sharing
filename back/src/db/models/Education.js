import { EducationModel } from "../schemas/education";
class Education {
<<<<<<< HEAD
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
      updateData,
      { returnOriginal: false }
    );
    return updatedEducation;
  }

  static async delete(educationId) {
    const deletedId = await EducationModel.findOneAndDelete({
      author: educationId,
    });
    return deletedId;
  }
=======
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
>>>>>>> cc27d6a6c215b377a0b64449e82a4d5e556b7735
}

export { Education };
