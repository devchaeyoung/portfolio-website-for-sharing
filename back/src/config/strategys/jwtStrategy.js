const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
import { User } from "../../db";

const jwtOptions = {
	secretOrKey: process.env.JWT_SECRET_KEY || "jwt-secret-key", // Replace with your JWT secret key
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

/** @description jwt전략
 * payload 정보를 데이터베이스와 비교하여 사용자 요청을 인가 */
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
