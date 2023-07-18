import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import morgan from 'morgan';
const { logger, morganFormat, logRequest } = require('../utils/logging');
import { 
    postEducation, 
    getMyEducation, 
    getUserEducation,
    putEducation, 
    deleteEducation
} from "../controllers/education-controller";
const educationAuthRouter = Router();

educationAuthRouter.use(morgan(morganFormat,{stream : logger.stream}));
educationAuthRouter.use(logRequest);




// 학력 작성 라우터, 본인 학력 조회
educationAuthRouter.route('/education')
    .post(login_required, postEducation)
    .get(login_required, getMyEducation);

// 특정 유저 학력 조회 라우터
// :userId => 사용자 Id
educationAuthRouter.route('/education/:userId')
    .get(login_required, getUserEducation)

// 학력 갱신 라우터, 학력 삭제 라우터
// :educationId => 자격증 Id
educationAuthRouter.route('/education/:educationId')
    .put(login_required, putEducation)
    .delete(login_required, deleteEducation);

export { educationAuthRouter };
