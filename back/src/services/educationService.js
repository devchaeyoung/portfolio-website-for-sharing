import { Education } from "../db/models/Education";

class educationAuthService {
  static async addEducation(title, major, crnt, startDate, endDate, author) {
    const newEducation = { title, major, crnt, startDate, endDate, author };

    const createdNewEducation = await Education.create(newEducation);
    // createdNewEducation.errorMessage = null;
    return createdNewEducation;
  }

  static async getEducation(userId) {
    const user = await Education.findUser(userId);
    return user;
  }

  static async setEducation(educationId, { toUpdate }) {
    let userEducation = await Education.findById(educationId);

    if (!userEducation) {
      const errorMessage = "다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    userEducation = await Education.update(educationId, toUpdate);

    return userEducation;
  }

  static async deleteEducation(educationId) {
    const deletedEducation = await Education.delete(educationId);
    return deletedEducation;
  }
}

export { educationAuthService };
