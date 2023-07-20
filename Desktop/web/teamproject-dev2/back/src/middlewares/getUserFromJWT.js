const passport = require("passport");
const logger = require("../utils/logger");
module.exports = (req, res, next) => {
	if (!req.cookies.token) {
		next();
		return;
	}
	logger.info("=======passport실험========");
	return passport.authenticate("jwt", { session: false })(req, res, next);
};
