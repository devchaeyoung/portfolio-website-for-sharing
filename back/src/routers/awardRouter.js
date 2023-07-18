import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { validateUserToken } from "../utils/validatorSchema/userValidator";
import {
	validateAddAward,
	validateIdAward,
	validateUpdateAward,
} from "../utils/validatorSchema/awardValidator";
import {
	addAward,
	getMyAwards,
	getAwards,
	updateAward,
	deleteAward,
} from "../controllers/award-controller";
const awardRouter = Router();

//award 작성 라우터
awardRouter.post("/award", login_required, validateAddAward, addAward);

// 본인 award 목록 조회
awardRouter.get("/award", login_required, validateUserToken, getMyAwards);

// :id award R U D
awardRouter
	.route("/award/:id")
	.get(login_required, validateIdAward, getAwards)
	.put(login_required, validateUpdateAward, updateAward)
	.delete(login_required, validateIdAward, deleteAward);

export { awardRouter };
