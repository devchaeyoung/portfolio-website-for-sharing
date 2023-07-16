import { Education } from "../db/index";

class educationAuthService {
    static async addEducation({toCreate}){

        const createdNewEducation = await Education.create(toCreate);
        // createdNewEducation.errorMessage = null;
        return createdNewEducation;
    }

    static async getEducation(userId) {
        const user = await Education.findUser(userId);
        return user;
    }

    


    static async setEducation(educationId, {toUpdate}){

        let EducationId = await Education.findEducation(educationId);
        
        if (!EducationId) {
            const errorMessage =
              "다시 한 번 확인해 주세요.";
            return { errorMessage };
          }

        const updatedEducation = await Education.update(educationId, toUpdate);

        return updatedEducation;
    }



    static async deleteEducation(educationId){
        const deletedEducation = await Education.delete(educationId);
        return deletedEducation;
    }
}

export { educationAuthService };
