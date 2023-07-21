import { AwardService } from "../services/awardService";
const { StatusCodes } = require("http-status-codes");
const code = StatusCodes;

/** @description Award 작성 */
const addAward = async (req, res, next) => {
	try {
		const userId = req.currentUserId;
		const inputValue = req.body;

		const createAward = await AwardService.createAward(userId, inputValue);
		res.status(code.CREATED).send(createAward);
	} catch (error) {
		next(error);
	}
};

/** @description 자신의 Awards */
const getMyAwards = async (req, res, next) => {
	try {
		const userId = req.currentUserId;
		const award = await AwardService.getMyAwards(userId);

		res.status(code.OK).json(award);
	} catch (error) {
		next(error);
	}
};

/** @description get Awards by id */
const getAwards = async (req, res, next) => {
	try {
		const userId = await req.params.id;
		const award = await AwardService.getAwards(userId);

		res.status(code.OK).json(award);
	} catch (error) {
		next(error);
	}
};

/** @description update award by awardId */
const updateAward = async (req, res, next) => {
	try {
		const awardId = req.params.id;
		const inputValue = req.body;
		const updatedAward = await AwardService.updateAward(
			awardId,
			inputValue,
		);
		res.status(code.CREATED).json(updatedAward);
	} catch (error) {
		next(error);
	}
};

/** @description delete ward by awardId */
const deleteAward = async (req, res, next) => {
	try {
		const awardId = req.params.id;
		const deletedAward = await AwardService.deleteAward(awardId);
		res.status(code.NO_CONTENT).json(deletedAward);
	} catch (error) {
		next(error);
	}
};

export { addAward, getMyAwards, getAwards, updateAward, deleteAward };
