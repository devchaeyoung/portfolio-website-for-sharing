const passport = require("passport");

/** @description jwt전략
 * 요청의 token 을 디코드하여 분석한 뒤 인가를 결정합니다. */
const authenticateJWT = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		req.currentUserId = user._id.toString();
		next();
	})(req, res, next);
};

module.exports = authenticateJWT;
