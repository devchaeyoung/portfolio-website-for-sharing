import { Router } from "express";
import { ProjectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";
import { User } from "../db";
const projectRouter = Router();

//프로젝트작성 라우터
projectRouter.post("/project", login_required, async (req, res, next) => {
    try {
        const { title, role, startDate, endDate, description } = req.body;
        const userId = await req.currentUserId;
        const author = await User.findById(userId);
        const newProject = await ProjectService.addProject(
            title,
            role,
            startDate,
            endDate,
            description,
            author
        );
        res.status(201).json(newProject);
    } catch (error) {
        console.log("라우터에러");
        next(error);
    }
});

export { projectRouter };
