import { Router } from "express";
import {
	postEducation,
	getMyEducation,
	getUserEducation,
	putEducation,
	deleteEducation,
} from "../controllers/education-controller";
import authenticateJWT from "../middlewares/authenticates/authenticateJWT";
const educationAuthRouter = Router();

// 학력 작성 라우터, 본인 학력 조회
educationAuthRouter
	.route("/education")
	.post(authenticateJWT, postEducation)
	.get(authenticateJWT, getMyEducation);

// 특정 유저 학력 조회 라우터
// :userId => 사용자 Id
educationAuthRouter
	.route("/education/:userId")
	.get(authenticateJWT, getUserEducation);

// 학력 갱신 라우터, 학력 삭제 라우터
// :educationId => 자격증 Id
educationAuthRouter
	.route("/education/:educationId")
	.put(authenticateJWT, putEducation)
	.delete(authenticateJWT, deleteEducation);

export { educationAuthRouter };
