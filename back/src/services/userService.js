import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomPassword } from "../utils/random-password";
import { sendMail } from "../utils/send-mail";
import { emailInUse } from "../utils/emailInUse";

class userAuthService {
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

	static async getUser({ email, password }) {
		const user = await User.findByEmail({ email });
		console.log(user);
		if (!user) {
			const errorMessage = `해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.`;
			return { errorMessage };
		}
		// 비밀번호 일치 여부 확인
		const correctPasswordHash = user.password;
		const isPasswordCorrect = await bcrypt.compare(
			password,
			correctPasswordHash
		);
		if (!isPasswordCorrect) {
			const errorMessage =
				"비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
			return { errorMessage };
		}

		// 로그인 성공 -> JWT 웹 토큰 생성
		const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
		const token = jwt.sign({ user_id: user._id }, secretKey, {
			expiresIn: "99h",
		});
		// 반환할 loginuser 객체를 위한 변수 설정
		const _id = user._id;
		const name = user.name;
		const description = user.description;

		const loginUser = {
			token,
			_id,
			email,
			name,
			description,
			errorMessage: null,
		};
		return loginUser;
	}

	static async getUsers() {
		const users = await User.findAll();
		return users;
	}

	static async getUserInfo(user_id) {
		const user = await User.findById(user_id);
		// db에서 찾지 못한 경우, 에러 메시지 반환
		if (!user) {
			const errorMessage =
				"해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
			return { errorMessage };
		}

		return user;
	}

	static async setUser({ user_id, toUpdate }) {
		// 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
		let user = await User.findById(user_id);
		// db에서 찾지 못한 경우, 에러 메시지 반환
		if (!user) {
			const errorMessage =
				"가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
			return { errorMessage };
		}

		// 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
		if (toUpdate.name) {
			const fieldToUpdate = "name";
			const newValue = toUpdate.name;
			user = await User.update({ user_id, fieldToUpdate, newValue });
		}

		if (toUpdate.email) {
			const fieldToUpdate = "email";
			const newValue = toUpdate.email;
			user = await User.update({ user_id, fieldToUpdate, newValue });
		}

		if (toUpdate.password) {
			const fieldToUpdate = "password";
			const newValue = bcrypt.hash(toUpdate.password, 10);
			user = await User.update({ user_id, fieldToUpdate, newValue });
		}

		if (toUpdate.description) {
			const fieldToUpdate = "description";
			const newValue = toUpdate.description;
			user = await User.update({ user_id, fieldToUpdate, newValue });
		}

		return user;
	}

	static async setUserPassword({ email }) {
		const user = await User.findByEmail({ email });
		if (!user) {
			const errorMessage = `해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.`;
			return { errorMessage };
		}
		const userEmail = user.email;
		const newPassword = randomPassword();
		await sendMail(
			userEmail,
			"임시 비밀번호 발급",
			`
            안녕하세요. What's for lunch﹖ 입니다.\n
            임시 비밀번호 ${newPassword} 를 사용하여 로그인 해주세요.\n
            로그인 후 비밀번호를 변경해주세요.\n
            비밀번호 변경은 마이페이지에서 가능합니다.\n\n`
		);
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		const updateUser = await User.passwordUpdate({
			userEmail,
			hashedPassword,
		});

		return updateUser;
	}

	static async deleteUser(user_id) {
		const deleteUser = await User.delete(user_id);
		return deleteUser;
	}
}

export { userAuthService };
