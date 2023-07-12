import { Router } from "express";
import { AwardService } from "../services/awardService";
import { login_required } from "../middlewares/login_required";
import { User } from "../db";

const awardRouter = Router();

//award 작성 라우터
awardRouter.post("/award", login_required, async (req, res, next) => {
    try {
        const { title, info, issuer } = req.body;
        const author = await User.findById(req.currentUserId);
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

// 수상이력 조회
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
awardRouter.put(
    "/award/:awardShortId",
    login_required,
    async (req, res, next) => {
        try {
            const shortId = req.params.awardShortId;
            const title = req.body.title ?? null;
            const info = req.body.info ?? null;
            const issuer = req.body.issuer ?? null;

            const toUpdate = { title, info, issuer };

            const updatedAward = await AwardService.setAward({
                shortId,
                toUpdate,
            });
            res.status(200).json(updatedAward);
        } catch (error) {
            next(error);
        }
    }
);

export { awardRouter };
