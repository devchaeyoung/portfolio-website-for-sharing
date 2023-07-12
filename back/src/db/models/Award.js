import { AwardModel } from "../schemas/award";
import { ProjectModel } from "../schemas/project";

class Award {
    static async create(newAward) {
        const createdNewAward = await AwardModel.create(newAward);
        return createdNewAward;
    }
    static async find(userId) {
        // 넘겨받은 유저id로 db에서 프로젝트들 찾아서 반환
        const awards = await AwardModel.find({ author: userId });
        return awards;
    }
    static async findById(shortId) {
        const award = await AwardModel.findOne({ shortId: shortId });
        return award;
    }

    static async update(shortId, fieldToUpdate, newValue) {
        // 제공받은 데이터로 프로젝트 업데이트
        const filter = { shortId: shortId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updateAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updateAward;
    }
}

export { Award };
