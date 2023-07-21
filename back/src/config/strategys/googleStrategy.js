const GoogleStrategy = require("passport-google-oauth20").Strategy;
import { User } from "../../db";

const config = {
	clientID:
		"291814284793-svmf2fi8v22k4i09g1flkanm35g8s5d6.apps.googleusercontent.com",
	clientSecret: "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",
	// callbackURL:
};
async function findOrCreateUser({ name, email }) {
	const user = await User.findByEmail({ email });
	if (user) {
		return user;
	}
	const created = await User.create({
		name,
		email,
		password: "GOOGLE_OAUTH",
	});
	return created;
}

/** @description 현재 구현만 되어 있고 프론트와 연동x */
const google = new GoogleStrategy(
	config,
	async (accessToken, refreshToken, profile, done) => {
		const { email, name } = profile._json;

		try {
			const user = await findOrCreateUser({ email, name });
			done(null, {
				_id: user._id,
				email: user.email,
				name: user.name,
			});
		} catch (e) {
			done(e, null);
		}
	},
);

module.exports = google;
