import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {
    addAward,
    getMyAwards,
    getAwards,
    updateAward,
    deleteAward,
} from "../controllers/award-controller";
const awardRouter = Router();

//award 작성 라우터
awardRouter.post("/award", login_required, addAward);

// 본인 award 목록 조회
awardRouter.get("/award", login_required, getMyAwards);

//특정 유저 award R U D
awardRouter
    .route("/award/:id")
    .get(login_required, getAwards)
    .put(login_required, updateAward)
    .delete(login_required, deleteAward);

export { awardRouter };
