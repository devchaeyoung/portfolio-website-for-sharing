import logger from "../utils/logger";

const { ProjectService } = require("../services/projectService");
const { StatusCodes } = require("http-status-codes");
const code = StatusCodes;

/** @description 프로젝트 작성 */
const addProject = async (req, res, next) => {
	try {
		const userId = req.currentUserId;
		const inputValue = req.body;

		const createProject = await ProjectService.createProject(
			userId,
			inputValue,
		);
		console.log(createProject);
		logger.info(
			`create project success: ${createProject.title} / ${createProject._id}`,
		);
		res.status(code.CREATED).json(createProject);
	} catch (error) {
		next(error);
	}
};

/** @description 사용자 프로젝트 리스트 */
const getMyProjects = async (req, res, next) => {
	try {
		const userId = await req.currentUserId;
		const project = await ProjectService.getMyProjects(userId);
		if (project.length === 0) {
			throw new Error("getMyProjects fail : 게시글이 없습니다.");
		}
		logger.info(`get my project success: ${project.length}`);
		res.status(code.OK).json(project);
	} catch (error) {
		next(error);
	}
};

const getProjects = async (req, res, next) => {
	try {
		const userId = await req.params.id;
		const project = await ProjectService.getProjects(userId);
		if (project.length === 0) {
			throw new Error("getProjects fail : 게시글이 없습니다.");
		}
		logger.info(`get project success: ${project.length}`);
		res.status(code.OK).json(project);
	} catch (error) {
		next(error);
	}
};

const updateProject = async (req, res, next) => {
	try {
		const projectId = req.params.id;
		const inputValue = req.body;
		const updateProject = await ProjectService.updateProject(
			projectId,
			inputValue,
		);
		logger.info(`update project success: ${updateProject.title}`);
		res.status(code.CREATED).json(updateProject);
	} catch (error) {
		next(error);
	}
};

const deleteProject = async (req, res, next) => {
	try {
		const projectId = req.params.id;
		const deletedProject = await ProjectService.deleteProject(projectId);
		logger.info(`delete project success: ${projectId}`);
		res.status(code.NO_CONTENT).json(deletedProject);
	} catch (error) {
		next(error);
	}
};

export { addProject, getProjects, getMyProjects, updateProject, deleteProject };
