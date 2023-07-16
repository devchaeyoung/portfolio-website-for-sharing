const Joi = require("joi");
const paramIdPattern = /^[0-9a-fA-F]{24}$/;

function validateAddProject(req, res, next) {
	const { id } = req.params;
	const { title, role, startDate, endDate, description } = req.body;

	const idSchema = Joi.string().regex(paramIdPattern).required().messages({
		"string.base": "사용자 ID는 문자열이여야 합니다.",
		"string.pattern.base": "사용자 ID 형식이 잘못되었습니다.",
		"any.required": "사용자 ID가 필요합니다.",
	});
	const bodySchema = Joi.object({
		title: Joi.string().min(1).max(20).required().messages({
			"string.base": "제목은 문자열이여만 합니다",
			"string.min": "제목이 너무 짧습니다.",
			"string.max": "제목은 최대 20자 작성 가능합니다.",
			"any.required": "제목을 작성해주세요.",
		}),
		role: Joi.string().min(1).max(20).required().messages({
			"string.base": "역할은 문자열이여만 합니다.",
			"string.min": "역할의 내용이 너무 짧습니다.",
			"string.max": "역할의 내용은 최대 20자 작성 가능합니다.",
			"any.required": "역할을 작성해주세요.",
		}),
		startDate: Joi.string().required().messages({
			"string.base": "시작일자는 문자열이여만 합니다.",
			"any.required": "시작일자를 작성해주세요.",
		}),
		endDate: Joi.string().required().messages({
			"string.base": "종료일자는 문자열이여만 합니다.",
			"any.required": "종료일자를 작성해주세요.",
		}),
		description: Joi.string().max(200).optional().messages({
			"string.base": "Description must be a string.",
			"string.max": "Description must have at most {#limit} characters.",
		}),
	});
	const idValidation = idSchema.validate(id);
	const bodyValidation = bodySchema.validate(
		{
			title,
			role,
			startDate,
			endDate,
			description,
		},
		{ abortEarly: false },
	);
	if (idValidation.error) {
		return res.status(400).json({
			error: "유효하지 않은 아이디 입니다.",
			location: "params",
		});
	}
	if (bodyValidation.error) {
		const details = bodyValidation.error.details.map(
			(error) => error.message,
		);
		return res.status(400).json({
			error: "Invalid post data",
			location: "body",
			details: details,
		});
	}
	req.validatedUserId = idValidation.value;
	req.validatedPostData = bodyValidation.value;
	next();
}

module.exports = { validateAddProject };
