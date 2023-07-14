import { Education } from "../db/models/Education";

class educationAuthService {
<<<<<<< HEAD
    static async addEducation(title, major, crnt, startDate, endDate, author){


        const newEducation = {title, major,crnt, startDate, endDate, author};

        const createdNewEducation = await Education.create(newEducation);
        // createdNewEducation.errorMessage = null;
        return createdNewEducation;
    }

    static async getEducation(userId) {
        const user = await Education.findUser(userId);
        return user;
    }

    


    static async setEducation({educationId, toUpdate}){

        let userEducation = await Education.findById(educationId);
        
        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
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

        if (toUpdate.startDate) {
            const fieldToUpdate = "startDate";
            const newValue = toUpdate.startDate;
            userEducation = await Education.update(
                educationId,
                fieldToUpdate,
                newValue
            );
        }

        if (toUpdate.endDate) {
            const fieldToUpdate = "endDate";
            const newValue = toUpdate.endDate;
            userEducation = await Education.update(
                educationId,
                fieldToUpdate,
                newValue
            );
        }

        return userEducation;
    }



    static async deleteEducation(educationId){
        const deletedEducation = await Education.delete(educationId);
        return deletedEducation;
    }
=======
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
>>>>>>> 64c2390c5f1d7d13e160547f245ce0fa5bdd1e35
}

export { educationAuthService };
