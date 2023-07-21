import { User } from "../../db";
import bcrypt from "bcrypt";
const LocalStrategy = require("passport-local").Strategy;

/** @description local 전략
 * 이메일과 패스워드를 데이터베이스와 대조해 유저를 확인합니다 */
const local = new LocalStrategy(
	{
		usernameField: "email",
		passwordField: "password",
	},
	async (email, password, done) => {
		try {
			const user = await User.findByEmail({ email });
			if (!user) {
				return done(null, false, {
					message: "Incorrect email or password",
				});
			}
			const result = await bcrypt.compare(password, user.password);
			if (!result) {
				return done(null, false, {
					message: "Incorrect email or password",
				});
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	},
);

export { local };
