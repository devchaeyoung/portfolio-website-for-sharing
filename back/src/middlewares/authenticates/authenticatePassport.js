import passport from "passport";
import { generateToken } from "../../utils/generateToken";

const authenticatePassport = (req, res, next) => {
	passport.authenticate("local", { session: false }, (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({ message: info.message });
		}
		const payload = { sub: user._id };
		const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
		const token = generateToken(payload, secretKey, "99h");

		req.user = user; // Store the authenticated user in the request object
		req.token = token; // Store the generated token in the request object
		next();
	})(req, res, next);
};

module.exports = authenticatePassport;
