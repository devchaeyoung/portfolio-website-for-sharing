import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { createValidator } from "express-joi-validation";
import { educationBodySchema } from "../utils/validatorSchema/educationBodySchema";
import morgan from 'morgan';

const validator = createValidator();
const { logger, morganFormat, logRequest } = require('../utils/logging');
const educationAuthRouter = Router();

educationAuthRouter.use(morgan(morganFormat,{stream : logger.stream}));
educationAuthRouter.use(logRequest);

import { 
    postEducation, 
    getMyEducation, 
    getUserEducation,
    putEducation, 
    deleteEducation
} from "../controllers/education-controller";

// 학력 작성 라우터, 본인 학력 조회
educationAuthRouter.route('/education')
    .post(login_required, validator.body(educationBodySchema.postEducationSchema()), postEducation)
    .get(login_required, getMyEducation);

// 특정 유저 학력 조회 라우터
// :userId => 사용자 Id
educationAuthRouter.route('/education/:userId')
    .get(login_required, getUserEducation)

// 학력 갱신 라우터, 학력 삭제 라우터
// :educationId => 자격증 Id
educationAuthRouter.route('/education/:educationId')
    .put(login_required, validator.body(educationBodySchema.putEducationSchema()), putEducation)
    .delete(login_required, deleteEducation);

export { educationAuthRouter };
