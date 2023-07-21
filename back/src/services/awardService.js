import { Award } from "../db";

class AwardService {
	/** @description award 작성 시 form data 를 저장합니다
	 * 이 때 author 필드 키의 값은 userId */
	static async createAward(userId, inputValue) {
		const newAward = { ...inputValue, author: userId };

		const createdAward = await Award.create(newAward);
		return createdAward;
	}

	/** @description 디코드한 토큰에서 추출한 payload의 userId를 이용
	 * 해당 아이디로 작성된 award를 로드합니다 */
	static async getMyAwards(userId) {
		const getAwards = await Award.findMyAwards(userId);
		return getAwards;
	}

	/** @description path param 의 userId를 이용
	 * 해당 아이디로 작성된 award를 로드합니다 */
	static async getAwards(userId) {
		const getAwards = await Award.findAwards(userId);
		return getAwards;
	}

	/** @description path param 의 awardId를 이용
	 * 해당 아이디의 award를 업데이트합니다 */
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

	/** @description path param 의 awardId를 이용
	 * 해당 아이디의 award를 삭제합니다 */
	static async deleteAward(awardId) {
		const deletedAward = await Award.delete(awardId);
		return deletedAward;
	}
}

export { AwardService };
