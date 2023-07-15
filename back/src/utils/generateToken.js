const jwt = require("jsonwebtoken");

function generateToken(payload, secretKey, expiresIn) {
	return jwt.sign(payload, secretKey, {
		expiresIn,
		issuer: "what's for lunch?",
	});
}

module.exports = {
	generateToken,
};
