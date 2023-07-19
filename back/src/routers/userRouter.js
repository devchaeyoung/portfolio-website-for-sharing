import { Router } from "express";
import { login_required } from "../middlewares/login_required";
const {
	validateRegistration,
	validateLogin,
	validateUserToken,
	validateUserId,
	validateUpdateUser,
} = require("../utils/validatorSchema/userValidator");
import {
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
} from "../controllers/user-controller";
import authenticateLocal from "../middlewares/authenticates/authenticateLocal";
import authenticateJWT from "../middlewares/authenticates/authenticateJWT";
const uploadMiddleware = require("./uploads/uploadMiddleware");

const userAuthRouter = Router();

// 회원가입 라우터
userAuthRouter.post("/user/register", validateRegistration, singUpUser);

// 로그인 라우터
userAuthRouter.post("/user/login", validateLogin, authenticateLocal, loginUser);

// 유저리스트 조회 라우터
userAuthRouter.get("/userlist", authenticateJWT, validateUserToken, getUsers);

// 현재 사용자 조회 라우터
userAuthRouter.get(
	"/user/current",
	authenticateJWT,
	validateUserToken,
	currentUser,
);

userAuthRouter
	.route("/user/:id")
	.get(authenticateJWT, validateUserId, getUser) // 유저 조회
	.put(authenticateJWT, validateUpdateUser, updateUser) // 유저 정보 수정
	.delete(authenticateJWT, validateUserToken, deleteUser); // 회원 탈퇴

//
userAuthRouter.put(
	"/user/:id",
	authenticateJWT,
	uploadMiddleware.handleImageUpload,
	uploadUser,
);
//
// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, userJWT);

// 로그아웃 라우터
userAuthRouter.post("/user/logout", authenticateJWT, logoutUser);

// 비밀번호 초기화 라우터
userAuthRouter.post("/user/reset-password", setPassword);

export { userAuthRouter };
