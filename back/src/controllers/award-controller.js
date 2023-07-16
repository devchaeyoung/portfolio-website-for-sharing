import { AwardService } from "../services/awardService";
const { StatusCodes } = require("http-status-codes");
const code = StatusCodes;

/** @description 수상이력 작성 */
const addAward = async (req, res, next) => {
	try {
		const userId = req.currentUserId;
		const inputValue = req.body;

		const createAward = await AwardService.createAward(userId, inputValue);
		res.status(code.CREATED).json(createAward);
	} catch (error) {
		next(error);
	}
};
/** @description 내 수상이력 */
const getMyAwards = async (req, res, next) => {
	try {
		const userId = req.currentUserId;
		const award = await AwardService.getMyAwards(userId);
		res.status(code.OK).json(award);
	} catch (error) {
		next(error);
	}
};

/** @description path:id 해당하는 수상이력 */
const getAwards = async (req, res, next) => {
	try {
		const awardId = await req.params.id;
		const award = await AwardService.getAwards(awardId);
		res.status(code.OK).json(award);
	} catch (error) {
		next(error);
	}
};

/** @description path:id 수상이력 업데이트 */
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

/** @description path:id 수상이력 삭제 */
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
