import { User } from "../../db";
import bcrypt from "bcrypt";
const LocalStrategy = require("passport-local").Strategy;

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
