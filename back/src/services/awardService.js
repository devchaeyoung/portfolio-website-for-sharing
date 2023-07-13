import { Award } from "../db";

class AwardService {
    // award 작성 서비스
    static async addAward(title, info, issuer, author) {
        const award = {
            title: title,
            info: info,
            issuer: issuer,
            author: author,
        };
        const createdNewAward = await Award.create(award);
        return createdNewAward;
    }

    // award 조회 서비스
    static async getAward(userId) {
        const awards = await Award.find(userId);
        return awards;
    }

    // award update 서비스
    static async setAward({ awardId, toUpdate }) {
        let award = await Award.findById(awardId);
        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            award = await Award.update(awardId, fieldToUpdate, newValue);
        }
        if (toUpdate.info) {
            const fieldToUpdate = "info";
            const newValue = toUpdate.info;
            award = await Award.update(awardId, fieldToUpdate, newValue);
        }
        if (toUpdate.issuer) {
            const fieldToUpdate = "issuer";
            const newValue = toUpdate.issuer;
            award = await Award.update(awardId, fieldToUpdate, newValue);
        }
        return award;
    }

    // award delete 서비스
    static async deleteAward(awardId) {
        const deletedAward = await Award.delete(awardId);
        return deletedAward;
    }
}

export { AwardService };
