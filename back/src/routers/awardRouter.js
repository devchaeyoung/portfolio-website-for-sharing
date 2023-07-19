import { Router } from "express";
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
import authenticateJWT from "../middlewares/authenticates/authenticateJWT";
const awardRouter = Router();

//award 작성 라우터
awardRouter.post("/award", authenticateJWT, validateAddAward, addAward);

// 본인 award 목록 조회
awardRouter.get("/award", authenticateJWT, validateUserToken, getMyAwards);

// :id award R U D
awardRouter
	.route("/award/:id")
	.get(authenticateJWT, validateIdAward, getAwards)
	.put(authenticateJWT, validateUpdateAward, updateAward)
	.delete(authenticateJWT, validateIdAward, deleteAward);

export { awardRouter };
