import { AwardService } from "../services/awardService";
const { StatusCodes } = require("http-status-codes");
const code = StatusCodes;

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

const getMyAwards = async (req, res, next) => {
	try {
		const userId = req.currentUserId;
		const award = await AwardService.getMyAwards(userId);
		if (award.length === 0) {
			throw new Error("getMyAwards fail : 게시글이 없습니다.");
		}
		res.status(code.OK).json(award);
	} catch (error) {
		next(error);
	}
};

const getAwards = async (req, res, next) => {
	try {
		const userId = await req.params.id;
		const award = await AwardService.getAwards(userId);
		if (award.length === 0) {
			throw new Error("getAwards fail : 게시글이 없습니다.");
		}
		res.status(code.OK).json(award);
	} catch (error) {
		next(error);
	}
};

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
