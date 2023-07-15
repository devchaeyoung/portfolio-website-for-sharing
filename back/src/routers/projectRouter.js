import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {
	addProject,
	getProjects,
	getMyProjects,
	updateProject,
	deleteProject,
} from "../controllers/project-controller";
const projectRouter = Router();

// 프로젝트 작성 라우터
projectRouter.post("/project", login_required, addProject);

// 본인 프로젝트 목록 라우터
projectRouter.get("/project", login_required, getMyProjects);

// 특정 사용자 R U D
projectRouter
	.route("/project/:id")
	.get(login_required, getProjects)
	.put(login_required, updateProject)
	.delete(login_required, deleteProject);

export { projectRouter };
