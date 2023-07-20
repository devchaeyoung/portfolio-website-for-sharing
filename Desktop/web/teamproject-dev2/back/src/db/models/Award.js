import { AwardModel } from "../schemas/award";

class Award {
	static async create(newAward) {
		const createdAward = await AwardModel.create(newAward);
		return createdAward;
	}
	static async findMyAwards(userId) {
		const awards = await AwardModel.find({ author: userId });
		return awards;
	}
	static async findAwards(userId) {
		const award = await AwardModel.find({ author: userId });
		return award;
	}

	static async update(awardId, updates) {
		const updateAward = await AwardModel.findByIdAndUpdate(
			awardId,
			updates,
			{ new: true },
		).exec();
		return updateAward;
	}
	static async delete(awardId) {
		const deletedAward = await AwardModel.findByIdAndDelete(awardId);
		return deletedAward;
	}
}

export { Award };
