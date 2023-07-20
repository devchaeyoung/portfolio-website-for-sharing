const passport = require("passport");

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
