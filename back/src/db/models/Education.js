import { EducationModel } from "../schemas/education";
class Education {
  static async create(createData) {
    const createdNewEducation = await EducationModel.create(createData);
    return createdNewEducation;
  }

  static async findUser(userId) {
    const education = await EducationModel.find({ author: userId });
    return education;
  }

  static async findEducation(educationId) {
    const education = await EducationModel.findOne({ _id: educationId });
    return education;
  }

  static async update(educationId, updateData) {
    const updatedEducation = await EducationModel.findOneAndUpdate(
      { _id: educationId },
      updateData,
      { returnOriginal: false }
    );
    return updatedEducation;
  }

  static async delete(educationId) {
    const deletedId = await EducationModel.findOneAndDelete({
      _id: educationId,
    });
    return deletedId;
  }
}

export { Education };
