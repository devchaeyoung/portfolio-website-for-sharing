const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
import { User } from "../../db";

const jwtOptions = {
	secretOrKey: process.env.JWT_SECRET_KEY || "jwt-secret-key", // Replace with your JWT secret key
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwt = new JwtStrategy(jwtOptions, async (payload, done) => {
	try {
		const user = await User.findById(payload.user_id);
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	} catch (error) {
		done(error, false);
	}
});

export { jwt };
