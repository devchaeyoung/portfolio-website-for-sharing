import { Award } from "../db";

class AwardService {
    //어워드 작성 서비스
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

    static async getAward(userId) {
        // 유저id에 해당하는 어워드 반환
        const awards = await Award.find(userId);
        return awards;
    }

    static async setAward({ shortId, toUpdate }) {
        let award = await Award.findById(shortId);
        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            award = await Award.update(shortId, fieldToUpdate, newValue);
        }
        if (toUpdate.info) {
            const fieldToUpdate = "info";
            const newValue = toUpdate.info;
            award = await Award.update(shortId, fieldToUpdate, newValue);
        }
        if (toUpdate.issuer) {
            const fieldToUpdate = "issuer";
            const newValue = toUpdate.issuer;
            award = await Award.update(shortId, fieldToUpdate, newValue);
        }
        return award;
    }
}

export { AwardService };
