const Joi = require("joi");
const namePattern = /^[a-zA-Z가-힣\s]+$/;
const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()-=_+[\]{}|;:',.<>/?]+$/;
const paramIdPattern = /^[0-9a-fA-F]{24}$/;

/** @description 회원가입정보 유효성 검사
 * name: 최소2, 최대 20, 한글과 영소대 문자만 입력 가능
 * email: 이메일 형식 검사
 * password: 최소4, 최대 20, 영문 대소문자와 숫자, 그리고 특수문자만 입력 가능*/
function validateRegistration(req, res, next) {
	const { name, email, password } = req.body;
	const schema = Joi.object({
		name: Joi.string()
			.min(2)
			.max(20)
			.regex(namePattern)
			.required()
			.messages({
				"string.min": "이름은 최소 2자 이상이어야 합니다.",
				"string.max": "이름은 최대 10자 이하여야 합니다.",
				"string.pattern.base":
					"이름은 한글, 영문 대소문자만 입력 가능합니다.",
				"any.required": "이름은 필수 입력사항입니다.",
			}),
		email: Joi.string().email().required().messages({
			"string.email": "이메일 형식이 유효하지 않습니다.",
			"any.required": "이메일은 필수 입력사항입니다.",
		}),
		password: Joi.string()
			.min(4)
			.max(20)
			.regex(passwordPattern)
			.required()
			.messages({
				"string.min": "비밀번호는 최소 4자 이상이어야 합니다.",
				"string.max": "비밀번호는 최대 20자 이하여야 합니다.",
				"string.pattern.base":
					"비밀번호는 영문 대소문자, 숫자, 특수문자만 입력 가능합니다.",
				"any.required": "비밀번호는 필수 입력사항입니다.",
			}),
	});
	const { error, value } = schema.validate({ name, email, password });
	if (error) {
		const errorDetails = error.details.reduce((acc, { path, message }) => {
			acc[path[0]] = message;
			return acc;
		}, {});
		return res
			.status(400)
			.json({ error: "유효성 검사 에러", details: errorDetails });
	}
	req.validatedRegistration = value;
	next();
}

/** @description 로그인 유효성 검사
 * email: 이메일 형식 검사
 * password: 최소4, 최대 20, 영문 대소문자와 숫자, 그리고 특수문자만 입력 가능*/
function validateLogin(req, res, next) {
	const { email, password } = req.body;
	const schema = Joi.object({
		email: Joi.string().email().required().messages({
			"string.email": "이메일이 유효하지 않습니다.",
			"any.required": "이메일은 필수 입력사항입니다.",
		}),
		password: Joi.string().regex(passwordPattern).required().messages({
			"string.pattern.base":
				"비밀번호는 영문 대소문자, 숫자, 특수문자만 입력 가능합니다.",
			"any.required": "비밀번호가 틀렸거나 존재하지 않는 계정입니다.",
		}),
	});
	const { error, value } = schema.validate({ email, password });

	if (error) {
		const errorDetails = error.details.map((err) => err.message);
		return res
			.status(400)
			.json({ error: "유효성 검사 에러", details: errorDetails });
	}
	req.validatedLogin = value;
	next();
}

/** @description param 유효성 검사 */
function validateUserId(req, res, next) {
	const { id } = req.params;
	const schema = Joi.string().regex(paramIdPattern).required();
	const { error, value } = schema.validate(id);

	if (error) {
		return res.status(400).json({ error: "존재하지 않는 유저입니다." });
	}
	req.validatedUserId = value;
	next();
}

/** @description 디코드된 토큰값 유효성을 검사합니다.
 * Type : String && 24 hexadecimal digits */
function validateUserToken(req, res, next) {
	const currentUserId = req.currentUserId;

	const schema = Joi.string().regex(paramIdPattern).required();
	const { error, value } = schema.validate(currentUserId);

	if (error) {
		return res.cookie("token", null, { maxAge: 0 }).status(401).json({
			error: "토큰이 변조되었을 가능성이 있습니다. 다시 로그인 해주세요.",
		});
	}
	req.currentUserId = value;
	next();
}

/** @description 유저 업데이트 정보 유효성 검사
 * name: 최소2, 최대 20, 한글과 영소 대소문자만 입력 가능
 * email: 이메일 형식 검사
 * password: 최소4, 최대 20, 영문 대소문자와 숫자, 그리고 특수문자만 입력 가능
 * description: 최소1, 최대 200자*/
function validateUpdateUser(req, res, next) {
	const { id } = req.params;
	const { name, email, password, stacks, description, profileImage } =
		req.body;
	const idSchema = Joi.string().regex(paramIdPattern).required();
	const bodySchema = Joi.object({
		name: Joi.string().min(1).max(10).regex(namePattern).optional(),
		email: Joi.string().email().optional(),
		password: Joi.string().min(1).max(20).regex(passwordPattern).optional(),
		stacks: Joi.array().items(Joi.string().min(1).max(20)).optional(),
		description: Joi.string().min(1).max(200).optional(),
		profileImage: Joi.string().uri().optional(),
	})
		.min(1)
		.messages({
			"object.min": "수정할 정보가 없습니다.",
		});

	const idValidation = idSchema.validate(id);
	const bodyValidation = bodySchema.validate({
		name,
		email,
		password,
		stacks,
		description,
	});
	if (idValidation.error) {
		return res.status(400).json({
			error: "유효하지 않은 아이디 입니다.",
			location: "params",
		});
	}
	if (bodyValidation.error) {
		return res.status(400).json({
			error: "유효하지 않은 회원정보 입니다.",
			location: "body",
		});
	}
	req.validatedUserId = idValidation.value;
	req.validatedUserBody = bodyValidation.value;
	next();
}

module.exports = {
	validateRegistration,
	validateLogin,
	validateUserToken,
	validateUserId,
	validateUpdateUser,
};
