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

awardRouter.get("/award/:id", login_required, async (req, res, next) => {
    try {
        const userId = req.params;
        console.log(userId);
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
            const { title, info, issuer } = req.body;
            const updatedAward = await AwardService.updateAward(
                title,
                info,
                issuer
            );
            res.status(200).json(updatedAward);
        } catch (error) {
            next(error);
        }
    }
);

export { awardRouter };
