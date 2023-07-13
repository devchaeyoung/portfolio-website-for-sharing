import { Education } from "../db/models/Education";
const { ObjectId } = require('mongodb');
class educationAuthService {
    static async addEducation(schoolName, major, crnt, author){

        const name = await Education.findByName({schoolName});
        const majorname = await Education.findByMajor({major});
        const crntname = await Education.findByPresent({crnt});

        if(name && majorname && crntname){
            const errorMessage= "이미 등록되었습니다.";
            return {errorMessage};
        }

        const newEducation = {schoolName,major,crnt,author};

        const createdNewEducation = await Education.create(newEducation);
        return createdNewEducation;
    }

    static async getEducation(userId) {
        const user = await Education.findUser(userId);
        return user;
    }

    


    static async setEducation({educationId, toUpdate}){
        
        let userEducation = await Education.findById(educationId);

        if (!userEducation) {
            const errorMessage =
              "다시 한 번 확인해 주세요.";
            return { errorMessage };
          }
        if (toUpdate.schoolName){
            const fieldToUpdate = "schoolName";
            const newValue = toUpdate.schoolName;
            userEducation = await Education.update(educationId,fieldToUpdate,newValue);
        }
        if (toUpdate.major){
            const fieldToUpdate = "major";
            const newValue = toUpdate.major;
            userEducation = await Education.update(educationId,fieldToUpdate,newValue);
        }

        if (toUpdate.crnt){
            const fieldToUpdate = "crnt";
            const newValue = toUpdate.crnt;
            userEducation = await Education.update(educationId,fieldToUpdate,newValue);
        }

        return userEducation;
    }

}

export {educationAuthService};