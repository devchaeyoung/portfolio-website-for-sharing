const jwt = require("jsonwebtoken");

/** @description 전달받은 Object_id 를 사용해 토큰을 생성합니다. */
function generateToken(payload, secretKey, expiresIn) {
	return jwt.sign(payload, secretKey, {
		expiresIn,
		issuer: "what's for lunch?",
	});
}

module.exports = {
	generateToken,
};
