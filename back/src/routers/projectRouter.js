import { Router } from "express";
import { validateUserToken } from "../utils/validatorSchema/userValidator";
import {
	validateAddProject,
	validateIdProject,
	validateUpdateProject,
} from "../utils/validatorSchema/projectValidator";
import {
	addProject,
	getProjects,
	getMyProjects,
	updateProject,
	deleteProject,
} from "../controllers/project-controller";
import authenticateJWT from "../middlewares/authenticates/authenticateJWT";

const projectRouter = Router();

// 프로젝트 작성 라우터
projectRouter.post("/project", authenticateJWT, validateAddProject, addProject);

// 본인 프로젝트 목록 라우터
projectRouter.get(
	"/project",
	authenticateJWT,
	validateUserToken,
	getMyProjects,
);

// :id 프로젝트 R U D
projectRouter
	.route("/project/:id")
	.get(authenticateJWT, validateIdProject, getProjects)
	.put(authenticateJWT, validateUpdateProject, updateProject)
	.delete(authenticateJWT, validateIdProject, deleteProject);

export { projectRouter };
