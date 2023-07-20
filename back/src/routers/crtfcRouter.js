import { Router } from "express";
import {
	postCrtfc,
	getMyCrtfc,
	getUserCrtfc,
	putCrtfc,
	deleteCrtfc,
} from "../controllers/crtfc-controller";
import authenticateJWT from "../middlewares/authenticates/authenticateJWT";
const crtfcAuthRouter = Router();

// 자격증 작성 라우터, 본인 자격증 조회
crtfcAuthRouter
	.route("/crtfc")
	.post(authenticateJWT, postCrtfc)
	.get(authenticateJWT, getMyCrtfc);

// 특정 유저 자격증 조회 라우터
// :userId => 사용자 Id
crtfcAuthRouter.route("/crtfc/:userId").get(authenticateJWT, getUserCrtfc);

// 자격증 갱신 라우터, 자격증 삭제 라우터
// :crtfcId => 자격증 Id
crtfcAuthRouter
	.route("/crtfc/:crtfcId")
	.put(authenticateJWT, putCrtfc)
	.delete(authenticateJWT, deleteCrtfc);

export { crtfcAuthRouter };
