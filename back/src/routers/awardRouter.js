import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {
    postAward,
    getMyAwards,
    getAwards,
    updateAward,
    deleteAward,
} from "../controllers/award-controller";
const awardRouter = Router();

//award 작성 라우터
awardRouter.post("/award", login_required, postAward);

// 본인 award 목록 조회
awardRouter.get("/award", login_required, getMyAwards);

//특정 유저 award 목록 조회
awardRouter.route('/award/:id')
    .get(login_required, getAwards)
    .put(login_required, updateAward)
    .delete(login_required, deleteAward);

// awardRouter.get("/award/:id", login_required, getAwards);

// //award update 라우터
// awardRouter.put("/award/:id", login_required, updateAward);

// // award delete 라우터
// awardRouter.delete("/award/:id", login_required, deleteAward);

export { awardRouter };
