import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { createValidator } from "express-joi-validation";
import { crtfcBodySchema } from "../utils/validatorSchema/crtfcBodySchema";

import {
    postCrtfc,
    getMyCrtfc,
    getUserCrtfc,
    putCrtfc,
    deleteCrtfc,
} from "../controllers/crtfc-controller";

const validator = createValidator();

const crtfcAuthRouter = Router();


// 자격증 작성 라우터, 본인 자격증 조회
crtfcAuthRouter.route('/crtfc')
    .post(login_required, validator.body(crtfcBodySchema.postCrtfcSchema()), postCrtfc)
    .get(login_required, getMyCrtfc);

// 특정 유저 자격증 조회 라우터
// :userId => 사용자 Id
crtfcAuthRouter.route('/crtfc/:userId')
    .get(login_required, getUserCrtfc)

// 자격증 갱신 라우터, 자격증 삭제 라우터
// :crtfcId => 자격증 Id
crtfcAuthRouter.route('/crtfc/:crtfcId')
    .put(login_required, validator.body(crtfcBodySchema.putCrtfcSchema()), putCrtfc)
    .delete(login_required, deleteCrtfc);

export { crtfcAuthRouter };
