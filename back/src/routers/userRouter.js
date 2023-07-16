import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { createValidator } from "express-joi-validation";
import { userBodySchema } from "../utils/validatorSchema/userBodySchema";

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
} from "../controllers/user-controller";

const validator = createValidator();

const userAuthRouter = Router();

// 회원가입 라우터
userAuthRouter.post("/user/register", singUpUser);
// 로그인 라우터
userAuthRouter.post("/user/login", loginUser);

// 유저리스트 조회 라우터
userAuthRouter.get("/userlist", login_required, getUsers);

// 현재 사용자 조회 라우터
userAuthRouter.get("/user/current", login_required, currentUser);

userAuthRouter
	.route("/user/:id")
	.get(login_required, getUser) // 유저 조회
	.put(login_required, updateUser) // 유저 정보 수정
	.delete(login_required, deleteUser); // 회원 탈퇴

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, userJWT);

// 로그아웃 라우터
userAuthRouter.post("/user/logout", login_required, logoutUser);

// 비밀번호 변경 라우터
userAuthRouter.post("/user/reset-password", setPassword);

export { userAuthRouter };
