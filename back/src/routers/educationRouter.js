import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { createValidator } from "express-joi-validation";
import { educationBodySchema } from "../utils/validatorSchema/educationBodySchema";
import { 
    postEducation, 
    getMyEducation, 
    getUserEducation,
    putEducation, 
    deleteEducation
} from "../controllers/education-controller";

const validator = createValidator();

const educationAuthRouter = Router();

// 학력 작성 라우터, 본인 학력 조회
educationAuthRouter.route('/education')
    .post(login_required, validator.body(educationBodySchema.postEducationSchema()), postEducation)
    .get(login_required, getMyEducation);

// 특정 유저 학력 조회 라우터, 학력 갱신 라우터, 학력 삭제 라우터
// :userId => 사용자 Id
educationAuthRouter.route('/education/:userId')
    .get(login_required, getUserEducation)
    .put(login_required, validator.body(educationBodySchema.putEducationSchema()), putEducation)
    .delete(login_required, deleteEducation);

export { educationAuthRouter };
