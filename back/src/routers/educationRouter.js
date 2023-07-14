import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { 
    deleteEducation,
    getEducation, 
    postEducation, 
    putEducation, 
    userGetEducation 
} from "../controllers/education-controller";
const educationAuthRouter = Router();

educationAuthRouter.post(
    "/education",
    login_required,
    async (req, res, next) => {
        try {
            const { schoolName, major, crnt } = req.body;

            const author = await User.findById(req.currentUserId);
            const newEducation = await educationAuthService.addEducation(
                schoolName,
                major,
                crnt,
                author
            );
            res.status(201).json(newEducation);
        } catch (error) {
            next(error);
        }
    }
);

educationAuthRouter.put(
    "/education/:id",
    login_required,
    async (req, res, next) => {
        try {
            const educationId = req.params.id;
            const schoolName = req.body.schoolName ?? null;
            const major = req.body.major ?? null;
            const crnt = req.body.crnt ?? null;

            const toUpdate = { schoolName, major, crnt };

            const updatedEducation = await educationAuthService.setEducation({
                educationId,
                toUpdate,
            });

educationAuthRouter.put("/education/:id", login_required, putEducation);

educationAuthRouter.get(
    "/education",
    login_required,
    async (req, res, next) => {
        try {
            const education = await educationAuthService.getEducation(
                req.currentUserId
            );

            res.status(200).send(education);
        } catch (error) {
            next(error);
        }
    }
);

export { educationAuthRouter };
