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
	/** @description form data 를 사용해 데이터베이스에 회원을 등록합니다 */
	static async createUser(inputValue) {
		const { email, password, name } = inputValue;

		const user = await User.findByEmail({ email });
		emailInUse(user);
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = { name, email, password: hashedPassword };

		const createdNewUser = await User.create({ newUser });
		createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
		return createdNewUser;
	}

	/** @description 모든 유저의 정보를 반환합니다 */
	static async getUsers() {
		const users = await User.findAll();
		return users;
	}

	/** @description 디코드된 토큰에서 userId를 추출해 데이터베이스와 대조합니다 */
	static async getUserInfo(userId) {
		const user = await User.findById(userId);
		emailNotUse(user);

		return user;
	}

	/** @description path param 의 userId로 해당 유저를 찾아 업데이트합니다 */
	static async updateUser({ userId, inputValue }) {
		const user = await User.findById(userId);
		emailNotUse(user);

		const updates = Object.entries(inputValue).reduce(
			(acc, [key, value]) => {
				if (value !== undefined) {
					acc[key] = value;
				}
				return acc;
			},
			{},
		);
		const updateUser = await User.update(userId, updates);
		return updateUser;
	}

	/** @description 인자로 받은 email로 변경된 비밀번호를 전송 후 해시값을 데이터베이스에 저장합니다 */
	static async setUserPassword(email) {
		const user = await User.findByEmail({ email });
		await emailNotUse(user);

		const newPassword = randomPassword();
		const text = passwordChangeGuide(newPassword);
		await sendMail(email, "임시 비밀번호 발급", text);
		const newHashedPassword = await bcrypt.hash(newPassword, 10);
		const updateUser = await User.passwordUpdate(email, newHashedPassword);
		return updateUser;
	}

	/** @description path param 의 userId로 해당 유저를 삭제합니다 */
	static async deleteUser(userId) {
		const deleteUser = await User.delete(userId);
		return deleteUser;
	}
}

export { userAuthService };
