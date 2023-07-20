import { educationAuthService } from "../services/educationService";
import { educationBodySchema } from "../utils/validatorSchema/educationBodySchema";
const { StatusCodes } = require("http-status-codes");

const sendResponse = function (res, statusCode, data) {
	if (statusCode >= 400) {
	} else {
		res.status(statusCode).json(data);
	}
	return;
};

const postEducation = async (req, res) => {
	try {
		const author = req.currentUserId;
		const schema = educationBodySchema.postEducationSchema();
		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			return sendResponse(res, StatusCodes.BAD_REQUEST, {});
		}
		const addMyEducation = await educationAuthService.addEducation({
			toCreate: { ...req.body, author },
		});

		return sendResponse(res, StatusCodes.OK, addMyEducation);
	} catch (err) {
		return sendResponse(res, StatusCodes.NOT_FOUND, {});
	}
};

const getMyEducation = async (req, res) => {
	try {
		const myEducation = await educationAuthService.getEducation(
			req.currentUserId,
		);

		return sendResponse(res, StatusCodes.OK, myEducation);
	} catch (err) {
		return sendResponse(res, StatusCodes.NOT_FOUND, {});
	}
};

const getUserEducation = async (req, res) => {
	try {
		const userEducation = await educationAuthService.getEducation(
			req.params.userId,
		);

		return sendResponse(res, StatusCodes.OK, userEducation);
	} catch (err) {
		return sendResponse(res, StatusCodes.NOT_FOUND, {});
	}
};

const putEducation = async (req, res) => {
	try {
		const id = req.params.educationId;
		const schema = educationBodySchema.putEducationSchema();
		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			return sendResponse(res, StatusCodes.BAD_REQUEST, {});
		}
		const updatedEducation = await educationAuthService.setEducation(id, {
			toUpdate: { ...req.body },
		});

		return sendResponse(res, StatusCodes.OK, updatedEducation);
	} catch (err) {
		return sendResponse(res, StatusCodes.NOT_FOUND, {});
	}
};

const deleteEducation = async (req, res) => {
	try {
		const deleteEducation = await educationAuthService.deleteEducation(
			req.params.educationId,
		);

		return sendResponse(res, StatusCodes.OK, deleteEducation);
	} catch (err) {
		return sendResponse(res, StatusCodes.NOT_FOUND, {});
	}
};

export {
	postEducation,
	getMyEducation,
	getUserEducation,
	putEducation,
	deleteEducation,
};
