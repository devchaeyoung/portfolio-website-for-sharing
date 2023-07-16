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

    


    static async setEducation(userId, {toUpdate}){

        let userEducation = await Education.findUser(userId);
        
        if (!userEducation) {
            const errorMessage =
              "다시 한 번 확인해 주세요.";
            return { errorMessage };
          }

        const updatedEducation = await Education.update(userId, toUpdate);

        return updatedEducation;
    }



    static async deleteEducation(userId){
        const deletedEducation = await Education.delete(userId);
        return deletedEducation;
    }
}

export { educationAuthService };
