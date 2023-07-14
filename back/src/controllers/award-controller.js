import { AwardService } from "../services/awardService";

const postAward = async (req, res, next) => {
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
};

const getMyAwards = async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const award = await AwardService.getAward(userId);
        res.status(200).json(award);
    } catch (error) {
        next(error);
    }
};

const getAwards = async (req, res, next) => {
    try {
        const userId = await req.params.id;
        const award = await AwardService.getAward(userId);
        res.status(200).json(award);
    } catch (error) {
        next(error);
    }
};

const updateAward = async (req, res, next) => {
    try {
        const awardId = req.params.id;
        const title = req.body.title ?? null;
        const info = req.body.info ?? null;
        const issuer = req.body.issuer ?? null;

        const toUpdate = { title, info, issuer };
<<<<<<< HEAD

=======
>>>>>>> 80c782457e708bedd27d2bbb1e5d4110232ae594
        const updatedAward = await AwardService.setAward({
            awardId,
            toUpdate,
        });
        res.status(200).json(updatedAward);
    } catch (error) {
        next(error);
    }
};

const deleteAward = async (req, res, next) => {
    try {
        const awardId = req.params.id;
        const deletedAward = await AwardService.deleteAward(awardId);
        res.status(200).json(deletedAward);
        res.send("삭제되었습니다.");
    } catch (error) {
        next(error);
    }
};

export { postAward, getMyAwards, getAwards, updateAward, deleteAward };
