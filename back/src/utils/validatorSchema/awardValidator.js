const Joi = require("joi");
const paramIdPattern = /^[0-9a-fA-F]{24}$/;

/** @description 어워드 작성 유효성 검사
 * 디코드된 토큰값의 유효성을 검사
 * 게시글 형식 유효성 검사*/
function validateAddAward(req, res, next) {
	const currentUserId = req.currentUserId;
	const { title, info, issuer, date } = req.body;

	const idSchema = Joi.string().regex(paramIdPattern).required();
	const bodySchema = Joi.object({
		title: Joi.string().min(1).max(20).required().messages({
			"string.base": "제목은 문자열이여만 합니다",
			"string.min": "제목이 너무 짧습니다.",
			"string.max": "제목은 최대 20자 작성 가능합니다.",
			"any.required": "제목을 작성해주세요.",
		}),
		info: Joi.string().min(1).max(300).required().messages({
			"string.base": "정보의 내용은 문자열이여만 합니다.",
			"string.min": "정보의 내용이 너무 짧습니다.",
			"string.max": "정보의 내용은 최대 300자 작성 가능합니다.",
			"any.required": "정보를 작성해주세요.",
		}),
		issuer: Joi.string().max(20).required().messages({
			"string.base": "발급정보는 문자열이여만 합니다.",
			"string.max": "발급정보는 최대 20자 작성 가능합니다.",
			"any.required": "발급정보를 작성해주세요.",
		}),
		date: Joi.date().required().messages({
			"date.base": "날짜는 날짜형식이여만 합니다.",
			"any.required": "날짜를 작성해주세요.",
		}),
	});
	const idValidation = idSchema.validate(currentUserId);
	const bodyValidation = bodySchema.validate(
		{
			title,
			info,
			issuer,
			date,
		},
		{ abortEarly: false },
	);
	if (idValidation.error) {
		return res.status(400).json({
			error: "사용자가 아닙니다.",
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

/** @description 어워드 검색 유효성 검사
 * 어워드 게시어 ID 유효성 검사 */
function validateIdAward(req, res, next) {
	const { id } = req.params;
	const schema = Joi.string().regex(paramIdPattern).required();
	const { error, value } = schema.validate(id);

	if (error) {
		return res
			.status(400)
			.json({ error: "존재하지 않는 수상내역 입니다." });
	}
	req.validatedUserId = value;
	next();
}

/** @description 어워드 업데이트 유효성 검사
 * 어워드 게시글 ID 유효성 검사
 * 게시글 형식 유효성 검사 */
function validateUpdateAward(req, res, next) {
	const { id } = req.params;
	const { title, info, issuer, date } = req.body;

	const idSchema = Joi.string().regex(paramIdPattern).required();
	const bodySchema = Joi.object({
		title: Joi.string().min(1).max(20).optional().messages({
			"string.base": "제목은 문자열이여만 합니다",
			"string.min": "제목이 너무 짧습니다.",
			"string.max": "제목은 최대 20자 작성 가능합니다.",
		}),
		info: Joi.string().min(1).max(300).optional().messages({
			"string.base": "설명은 문자열이여만 합니다.",
			"string.min": "설명의 내용이 너무 짧습니다.",
			"string.max": "설명은 최대 300자 작성 가능합니다.",
		}),
		issuer: Joi.string().max(15).optional().messages({
			"string.base": "발급정보는 문자열이여만 합니다.",
			"string.max": "발급정보는 최대 15자 작성 가능합니다.",
		}),
		date: Joi.date().optional().messages({
			"date.base": "날짜는 날짜 형식이여만 합니다.",
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
			error: "유효하지 않은 수상내역 아이디 입니다.",
			location: "params",
		});
	}
	if (bodyValidation.error) {
		const details = bodyValidation.error.details.map(
			(error) => error.message,
		);
		return res.status(400).json({
			error: "내용을 올바르게 입력해주세요",
			location: "body",
			details: details,
		});
	}
	req.validatedUserId = idValidation.value;
	req.validatedPostData = bodyValidation.value;
	next();
}

module.exports = { validateAddAward, validateIdAward, validateUpdateAward };
