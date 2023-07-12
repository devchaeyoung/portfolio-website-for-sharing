import { Router } from "express";
import { ProjectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";
import { User } from "../db";
const projectRouter = Router();

// 프로젝트 작성 라우터
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
        next(error);
    }
});

// 로그인 유저의 프로젝트 목록 라우터
projectRouter.get("/project", login_required, async (req, res, next) => {
    try {
        const userId = await req.currentUserId;
        const project = await ProjectService.getProject(userId);
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

// 특정 프로젝트 update 라우터
projectRouter.put("/project/:id", login_required, async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const title = req.body.title ?? null;
        const role = req.body.role ?? null;
        const startDate = req.body.startDate ?? null;
        const endDate = req.body.endDate ?? null;
        const description = req.body.description ?? null;

        const toUpdate = { title, role, startDate, endDate, description };

        const updatedProject = await ProjectService.setProject({
            projectId,
            toUpdate,
        });
        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
});

export { projectRouter };
