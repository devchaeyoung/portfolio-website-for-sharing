import { Router } from "express";
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
} from "../controllers/user-controller";
import authenticateLocal from "../middlewares/authenticates/authenticateLocal";
import authenticateJWT from "../middlewares/authenticates/authenticateJWT";

const userAuthRouter = Router();

/** @return 회원가입 */
userAuthRouter.post("/user/register", validateRegistration, singUpUser);

/** @return 로그인 JWT 발급 */
userAuthRouter.post("/user/login", validateLogin, authenticateLocal, loginUser);

/** @return 유저 리스트 */
userAuthRouter.get("/userlist", authenticateJWT, validateUserToken, getUsers);

/** @return 현재 로그인 정보 */
userAuthRouter.get(
	"/user/current",
	authenticateJWT,
	validateUserToken,
	currentUser,
);

/** @return user 컬렉션 R U D */
userAuthRouter
	.route("/user/:id")
	.get(authenticateJWT, validateUserId, getUser)
	.put(authenticateJWT, validateUpdateUser, updateUser)
	.delete(authenticateJWT, validateUserToken, deleteUser);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", authenticateJWT, userJWT);

/** @return 로그아웃 토큰 삭제 */
userAuthRouter.post("/user/logout", authenticateJWT, logoutUser);

/** @return 비밀번호 초기화
 * 랜덤 비밀번호 생성 후 메일링
 * 생성된 새로운 비밀번호는 해시 후 데이터베이스에 저장 */
userAuthRouter.post("/user/reset-password", setPassword);

export { userAuthRouter };
