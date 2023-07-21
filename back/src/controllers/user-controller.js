import is from "@sindresorhus/is";
import { userAuthService } from "../services/userService";
import { User } from "../db";
import { handleImageUpload } from "../middlewares/uploadMiddleware";
const { StatusCodes } = require("http-status-codes");
const code = StatusCodes;

/** @description 회원가입 */
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

		res.status(code.CREATED).json(createUser);
	} catch (error) {
		next(error);
	}
};

/** @description 로그인 -> JWT Token 발급 */
const loginUser = async (req, res, next) => {
	try {
		const user = {
			token: req.token,
			_id: req.user._id,
			email: req.user.email,
			name: req.user.name,
			errorMessage: null,
		};
		res.status(code.OK).json(user);
	} catch (error) {
		next(error);
	}
};

/** @description 유저리스트 */
const getUsers = async (req, res, next) => {
	try {
		const users = await userAuthService.getUsers();
		res.status(code.OK).send(users);
	} catch (error) {
		error.message = `Failed to return user list ${req.currentUserId}`;
		next(error);
	}
};

/** @description 현재 사용자 검색 */
const currentUser = async (req, res, next) => {
	try {
		const userId = req.currentUserId;
		const currentUserInfo = await userAuthService.getUserInfo(userId);

		if (currentUserInfo.errorMessage) {
			throw new Error(currentUserInfo.errorMessage);
		}
		res.status(code.OK).send(currentUserInfo);
	} catch (error) {
		next(error);
	}
};
/** @description 회원정보수정 */
const updateUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
		await handleImageUpload(req, res, () => {});
		const inputValue = req.body;
		const updatedUser = await userAuthService.updateUser({
			userId,
			inputValue,
		});
		res.status(code.CREATED).json(updatedUser);
	} catch (error) {
		next(error);
	}
};

/** @description path:id 유저정보반환 */
const getUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const currentUserInfo = await userAuthService.getUserInfo(userId);

		if (currentUserInfo.errorMessage) {
			throw new Error(currentUserInfo.errorMessage);
		}
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
		res.clearCookie("token").status(code.OK).send("로그아웃 되었습니다.");
	} catch (error) {
		next(error);
	}
};

/** @description 회원탈퇴 */
const deleteUser = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const deletedUser = await userAuthService.deleteUser(userId);
		if (deletedUser.errorMessage) {
			throw new Error(deletedUser.errorMessage);
		}

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
		const { email, name } = req.body;
		const user = await User.findByEmail({ email });
		console.log(name, user.name);
		if (name !== user.name) {
			throw new Error("이름이 일치하지 않습니다.");
		}
		const newPassword = await userAuthService.setUserPassword(email);
		res.status(code.OK).json(newPassword);
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
};
