import { User } from "../../db";
import bcrypt from "bcrypt";
const LocalStrategy = require("passport-local").Strategy;

const local = new LocalStrategy(
	{
		usernameField: "email", // Replace with your username field name
		passwordField: "password", // Replace with your password field name
	},
	async (email, password, done) => {
		const user = await User.findByEmail({ email });
		if (!user) {
			return done(null, false, {
				message: "Incorrect username or password",
			});
		}
		const result = await bcrypt.compare(password, user.password);
		if (!result) {
			return done(null, false, {
				message: "Incorrect username or password",
			});
		}
		return done(null, user);
	},
);

export { local };
