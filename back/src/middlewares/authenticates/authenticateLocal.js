import passport from "passport";
import { generateToken } from "../../utils/generateToken";

const authenticateLocal = (req, res, next) => {
	passport.authenticate("local", { session: false }, (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({ message: info.message });
		}
		const payload = { userId: user._id };
		const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
		const token = generateToken(payload, secretKey, "99h");

		req.user = user;
		req.token = token;
		next();
	})(req, res, next);
};

module.exports = authenticateLocal;
