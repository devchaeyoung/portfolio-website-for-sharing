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
        const Awards = await Award.find(userId);
        return Awards;
    }

    static async updateAward(title, info, issuer, author) {
        const award = {
            title: title,
            info: info,
            issuer: issuer,
            author: author,
        };
        const updatedAward = await Award.update(award);
        return updatedAward;
    }
}

export { AwardService };
