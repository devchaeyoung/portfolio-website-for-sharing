import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { randomPassword } from "../utils/random-password";
import { sendMail } from "../utils/send-mail";
import { emailInUse } from "../utils/emailInUse";
import { emailNotUse } from "../utils/emailNotUse";
import { isPasswordCorrect } from "../utils/isPasswordCorrect";
import { generateToken } from "../utils/generateToken";
import passwordChangeGuide from "../utils/passwordChangeGuide";

class userAuthService {
	static async createUser(inputValue) {
		const { email, password, name } = inputValue;

		const user = await User.findByEmail({ email });
		await emailInUse(user);
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = { name, email, password: hashedPassword };

		const createdNewUser = await User.create({ newUser });
		createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
		return createdNewUser;
	}

	static async getUser({ email, password }) {
		const user = await User.findByEmail({ email });
		await emailNotUse(user);
		const correctPasswordHash = user.password;
		await isPasswordCorrect(password, correctPasswordHash);

		const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
		const token = generateToken({ user_id: user._id }, secretKey, "99h");

		return {
			token: token,
			_id: user._id,
			email: email,
			name: user.name,
			errorMessage: null,
		};
	}

	static async getUsers() {
		const users = await User.findAll();
		return users;
	}

	static async getUserInfo(user_id) {
		const user = await User.findById(user_id);
		emailNotUse(user);

		return user;
	}

	static async updateUser({ user_id, inputValue }) {
		const user = await User.findById(user_id);
		emailNotUse(user);

		const updates = Object.entries(inputValue).reduce(
			(acc, [key, value]) => {
				if (value !== undefined) {
					acc[key] = value;
				}
				return acc;
			},
			{}
		);
		const updateUser = await User.update(user_id, updates);
		return updateUser;
	}

	static async setUserPassword(email) {
		const user = await User.findByEmail({ email });
		await emailNotUse(user);

		const newPassword = randomPassword();
		const text = passwordChangeGuide(newPassword);
		await sendMail(email, "임시 비밀번호 발급", text);
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		const updateUser = await User.passwordUpdate({ email }, hashedPassword);

		return updateUser;
	}

	static async deleteUser(user_id) {
		const deleteUser = await User.delete(user_id);
		return deleteUser;
	}
}

export { userAuthService };
