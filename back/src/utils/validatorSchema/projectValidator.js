const Joi = require("joi");
const paramIdPattern = /^[0-9a-fA-F]{24}$/;

/** @description 프로젝트 작성 유효성 검사
 * 디코드된 토큰값의 유효성을 검사
 * 게시글 형식 유효성 검사 */
function validateAddProject(req, res, next) {
	const currentUserId = req.currentUserId;
	const { title, role, startDate, endDate, description } = req.body;

	const idSchema = Joi.string().regex(paramIdPattern).required();
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
		startDate: Joi.date().required().messages({
			"date.base": "시작일자는 날짜형식이여만 합니다.",
			"any.required": "시작일자를 작성해주세요.",
		}),
		endDate: Joi.date().required().messages({
			"date.base": "종료일자는 날짜형식이여만 합니다.",
			"any.required": "종료일자를 작성해주세요.",
		}),
		description: Joi.string().max(300).optional().messages({
			"string.base": "상세내용은 문자열이야 합니다.",
			"string.max": "상세내용은 최대 300자 작성 가능합니다.",
		}),
	});
	const projectIdValidation = idSchema.validate(currentUserId);
	const projectBodyValidation = bodySchema.validate(
		{
			title,
			role,
			startDate,
			endDate,
			description,
		},
		{ abortEarly: false },
	);
	if (projectIdValidation.error) {
		return res.status(400).json({
			error: "유효하지 않은 아이디 입니다.",
			location: "params",
		});
	}
	if (projectBodyValidation.error) {
		const details = projectBodyValidation.error.details.map(
			(error) => error.message,
		);
		return res.status(400).json({
			error: "잘못된 프로젝트 입니다",
			location: "body",
			details: details,
		});
	}
	req.validatedUserId = projectIdValidation.value;
	req.validatedPostData = projectBodyValidation.value;
	next();
}

/** @description 프로젝트 검색 유효성 검사 */
function validateIdProject(req, res, next) {
	const { id } = req.params;
	const schema = Joi.string().regex(paramIdPattern).required();
	const { error, value } = schema.validate(id);

	if (error) {
		return res.status(400).json({ error: "존재하지 않는 프로젝트입니다." });
	}
	req.validatedUserId = value;
	next();
}

/** @description 프로젝트 업데이트 유효성 검사
 * 프로젝트 게시글 ID 유효성 검사
 * 게시글 형식 유효성 검사*/
function validateUpdateProject(req, res, next) {
	const { id } = req.params;
	const { title, role, startDate, endDate, description } = req.body;

	const idSchema = Joi.string().regex(paramIdPattern).required();
	const bodySchema = Joi.object({
		title: Joi.string().min(1).max(20).optional().messages({
			"string.base": "제목은 문자열이여만 합니다",
			"string.min": "제목이 너무 짧습니다.",
			"string.max": "제목은 최대 20자 작성 가능합니다.",
		}),
		role: Joi.string().min(1).max(20).optional().messages({
			"string.base": "역할은 문자열이여만 합니다.",
			"string.min": "역할의 내용이 너무 짧습니다.",
			"string.max": "역할의 내용은 최대 20자 작성 가능합니다.",
		}),
		startDate: Joi.date().optional().messages({
			"date.base": "시작일자는 날짜형식이여만 합니다.",
		}),
		endDate: Joi.date().optional().messages({
			"dage.base": "종료일자는 날짜형식이여만 합니다.",
		}),
		description: Joi.string().max(300).optional().messages({
			"string.base": "상세내용은 문자열이야 합니다.",
			"string.max": "상세내용은 최대 300자 작성 가능합니다.",
		}),
	})
		.min(1)
		.messages({
			"object.min": "수정할 정보가 없습니다.",
		});
	const idValidation = idSchema.validate(id);
	const bodyValidation = bodySchema.validate(req.body, { abortEarly: false });

	if (idValidation.error) {
		return res.status(400).json({
			error: "유효하지 않은 게시글 아이디 입니다.",
			location: "params",
		});
	}
	if (bodyValidation.error) {
		const details = bodyValidation.error.details.map(
			(error) => error.message,
		);
		return res.status(400).json({
			error: "내용을 올바르게 입력해주세요.",
			location: "body",
			details: details,
		});
	}
	req.validatedUserId = idValidation.value;
	req.validatedPostData = bodyValidation.value;
	next();
}

module.exports = {
	validateAddProject,
	validateIdProject,
	validateUpdateProject,
};
