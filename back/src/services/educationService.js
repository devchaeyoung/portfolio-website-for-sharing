import { Education } from "../db/models/Education";

class educationAuthService {
  static async addEducation(schoolName, major, crnt, author) {
    const newEducation = { schoolName, major, crnt, author };

    const createdNewEducation = await Education.create(newEducation);
    // createdNewEducation.errorMessage = null;
    return createdNewEducation;
  }

  static async getEducation(userId) {
    const user = await Education.findUser(userId);
    return user;
  }

  static async setEducation({ educationId, toUpdate }) {
    let userEducation = await Education.findById(educationId);

    if (toUpdate.schoolName) {
      const fieldToUpdate = "schoolName";
      const newValue = toUpdate.schoolName;
      userEducation = await Education.update(
        educationId,
        fieldToUpdate,
        newValue
      );
    }
    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      userEducation = await Education.update(
        educationId,
        fieldToUpdate,
        newValue
      );
    }

    if (toUpdate.crnt) {
      const fieldToUpdate = "crnt";
      const newValue = toUpdate.crnt;
      userEducation = await Education.update(
        educationId,
        fieldToUpdate,
        newValue
      );
    }

    return userEducation;
  }

  static async deleteEducation(educationId) {
    const deletedEducation = await Education.delete(educationId);
    return deletedEducation;
  }
}

export { educationAuthService };
