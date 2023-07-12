import { AwardModel } from "../schemas/award";
import { ProjectModel } from "../schemas/project";

class Award {
    static async create(newAward) {
        const createdNewAward = await AwardModel.create(newAward);
        return createdNewAward;
    }
    static async find(id) {
        // 넘겨받은 유저id로 db에서 프로젝트들 찾아서 반환
        const Awards = await AwardModel.find(id).populate("author");
        return Awards;
    }

    static async update(updateAward) {
        // 제공받은 데이터로 프로젝트 업데이트
        const updatedAward = await AwardModel.findOneAndUpdate(updateAward);
        return updatedAward;
    }
}

export { Award };
