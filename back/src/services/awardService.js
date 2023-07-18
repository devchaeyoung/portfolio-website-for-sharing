import { Award } from "../db";

class AwardService {
	// award 작성 서비스
	static async createAward(userId, inputValue) {
		const newAward = { ...inputValue, author: userId };

		const createdAward = await Award.create(newAward);
		return createdAward;
	}

	// 토큰으로 조회
	static async getMyAwards(userId) {
		const getAwards = await Award.findMyAwards(userId);
		return getAwards;
	}

	// 게시글 id 조회
	static async getAwards(userId) {
		const getAwards = await Award.findAwards(userId);
		return getAwards;
	}

	// award update 서비스
	static async updateAward(awardId, inputValue) {
		const updates = Object.entries(inputValue).reduce(
			(acc, [key, value]) => {
				if (value !== undefined) {
					acc[key] = value;
				}
				return acc;
			},
			{},
		);
		const updateAward = await Award.update(awardId, updates);
		return updateAward;
	}

	// award delete 서비스
	static async deleteAward(awardId) {
		const deletedAward = await Award.delete(awardId);
		return deletedAward;
	}
}

export { AwardService };
