import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { validateUserToken } from "../utils/validatorSchema/userValidator";
import {
	validateAddProject,
	validateProjectId,
	validateUpdateProject,
} from "../utils/validatorSchema/projectValidator";
import {
	addProject,
	getProjects,
	getMyProjects,
	updateProject,
	deleteProject,
} from "../controllers/project-controller";

const projectRouter = Router();

// 프로젝트 작성 라우터
projectRouter.post("/project", login_required, validateAddProject, addProject);

// 본인 프로젝트 목록 라우터
projectRouter.get("/project", login_required, validateUserToken, getMyProjects);

// :id 프로젝트 R U D
projectRouter
	.route("/project/:id")
	.get(login_required, validateProjectId, getProjects)
	.put(login_required, validateUpdateProject, updateProject)
	.delete(login_required, validateProjectId, deleteProject);

export { projectRouter };
