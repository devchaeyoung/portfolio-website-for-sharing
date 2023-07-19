import is from "@sindresorhus/is";
import { userAuthService } from "../services/userService";
import logger from "../utils/logger";
const { StatusCodes } = require("http-status-codes");
const code = StatusCodes;

const test = async (req, res, next) => {
	const user = req.user;
	const token = req.token;

	res.json({ user, token });
};

const singUpUser = async (req, res, next) => {
	try {
		if (is.emptyObject(req.body)) {
			throw new Error(
				"headers의 Content-Type을 application/json으로 설정해주세요",
			);
		}
		const inputValue = req.body;
		const createUser = await userAuthService.createUser(inputValue);

		if (createUser.errorMessage) {
			throw new Error(createUser.errorMessage);
		}

		logger.info(`Registration success : ${createUser.email}`);
		res.status(code.CREATED).json(createUser);
	} catch (error) {
		next(error);
	}
};

/** @description 로그인 -> JWT Token 발급 */
const loginUser = async (req, res, next) => {
	try {
		const email = req.body.email;
		const password = req.body.password;

		const user = await userAuthService.getUser({ email, password });

		if (user.errorMessage) {
			throw new Error(user.errorMessage);
		}

		logger.info(`Login success : ${user.email}`);
		res.status(code.OK).send(user);
	} catch (error) {
		next(error);
	}
};

/** @description 유저리스트 */
const getUsers = async (req, res, next) => {
	try {
		const users = await userAuthService.getUsers();

		logger.info(`Get users success: ${users.length}`);
		res.status(code.OK).send(users);
	} catch (error) {
		error.message = `Failed to return user list ${req.currentUserId}`;
		next(error);
	}
};
//
const uploadUser = async (req, res, next) => {
	try {
		if (req.file) {
			const user_id = req.currentUserId;
			const inputValue = req.body;
			inputValue.profileImage = req.file.path;
			const updatedUser = await userAuthService.updateUser({
				user_id,
				inputValue,
			});
			console.log("Uploaded Image:", req.file);
			console.log({ url: req.file.path });
			res.status(code.CREATED).json(updatedUser);
		} else {
			res.status(400).json({
				error: "No file uploaded or an error occurred during upload.",
			});
		}
	} catch (err) {
		next(err);
	}
};
//

/** @description 현재 사용자 검색 */
const currentUser = async (req, res, next) => {
	try {
		const user_id = req.currentUserId;
		const currentUserInfo = await userAuthService.getUserInfo(user_id);

		if (currentUserInfo.errorMessage) {
			throw new Error(currentUserInfo.errorMessage);
		}
		logger.info(
			`Get current user success :${JSON.stringify(
				currentUserInfo.email,
			)}`,
		);
		res.status(code.OK).send(currentUserInfo);
	} catch (error) {
		next(error);
	}
};
/** @description 회원정보수정 */
const updateUser = async (req, res, next) => {
	try {
		const user_id = req.params.id;
		const inputValue = req.body;
		const updatedUser = await userAuthService.updateUser({
			user_id,
			inputValue,
		});
		logger.info(`Update user success : ${updatedUser}`);
		res.status(code.CREATED).json(updatedUser);
	} catch (error) {
		next(error);
	}
};

/** @description path:id 유저정보반환 */
const getUser = async (req, res, next) => {
	try {
		const user_id = req.params.id;
		const currentUserInfo = await userAuthService.getUserInfo(user_id);

		if (currentUserInfo.errorMessage) {
			throw new Error(currentUserInfo.errorMessage);
		}
		logger.info(`Get user success : ${currentUserInfo.email}`);
		res.status(code.OK).send(currentUserInfo);
	} catch (error) {
		next(error);
	}
};

/** @description 단순 유저 Token 정보 */
const userJWT = async (req, res) => {
	res.status(code.OK).send(
		`안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`,
	);
};

/** @description 로그아웃 -> 쿠키를 초기화합니다 */
const logoutUser = async (req, res, next) => {
	try {
		logger.info(`Logout success : ${req.currentUserId}`);
		res.cookie("token", null, { maxAge: 0 })
			.status(code.OK)
			.send("로그아웃 되었습니다.");
	} catch (error) {
		next(error);
	}
};

/** @description 회원탈퇴 */
const deleteUser = async (req, res, next) => {
	try {
		const user_id = req.params.id;
		const deletedUser = await userAuthService.deleteUser(user_id);
		if (deletedUser.errorMessage) {
			throw new Error(deletedUser.errorMessage);
		}

		logger.info(`Delete user success : ${deletedUser}`);
		res.cookie("token", null, { maxAge: 0 });
		res.status(code.NO_CONTENT).json("정상적으로 탈퇴 되었습니다.");
	} catch (error) {
		error.message = `Failed to delete user ${req.currentUserId}`;
		next(error);
	}
};

/** @description 비밀번호 초기화 */
const setPassword = async (req, res, next) => {
	try {
		const email = req.body.email;
		const user = await userAuthService.setUserPassword(email);

		logger.info(`Set password success & send email : ${user.email}`);
		res.status(code.OK).json(user);
	} catch (error) {
		error.message = `Failed to set password ${req.body.email}`;
		next(error);
	}
};

export {
	singUpUser,
	loginUser,
	getUsers,
	currentUser,
	updateUser,
	getUser,
	userJWT,
	logoutUser,
	deleteUser,
	setPassword,
	uploadUser,
	test,
};
