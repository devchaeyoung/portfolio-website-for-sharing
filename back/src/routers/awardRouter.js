import { Router } from "express";
import { AwardService } from "../services/awardService";
import { login_required } from "../middlewares/login_required";

const awardRouter = Router();

//award 작성 라우터
awardRouter.post("/award", login_required, async (req, res, next) => {
    try {
        const { title, info, issuer } = req.body;
        const author = req.currentUserId;
        const newAward = await AwardService.addAward(
            title,
            info,
            issuer,
            author
        );
        res.status(201).json(newAward);
    } catch (error) {
        next(error);
    }
});

// 로그인 유저 award 목록 조회
awardRouter.get("/award", login_required, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const award = await AwardService.getAward(userId);
        res.status(200).json(award);
    } catch (error) {
        next(error);
    }
});

//award update 라우터
awardRouter.put("/award/:id", login_required, async (req, res, next) => {
    try {
        const awardId = req.params.id;
        const title = req.body.title ?? null;
        const info = req.body.info ?? null;
        const issuer = req.body.issuer ?? null;

        const toUpdate = { title, info, issuer };

        const updatedAward = await AwardService.setAward({
            awardId,
            toUpdate,
        });
        res.status(200).json(updatedAward);
    } catch (error) {
        next(error);
    }
});

// award delete 라우터
awardRouter.delete("/award/:id", login_required, async (req, res, next) => {
    try {
        const awardId = req.params.id;
        const deletedAward = await AwardService.deleteAward(awardId);
        res.status(200).json(deletedAward);
    } catch (error) {
        next(error);
    }
});

export { awardRouter };
