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
		res.status(code.CREATED).json(createProject);
	} catch (error) {
		next(error);
	}
};

/** @description 본인 프로젝트 목록 */
const getMyProjects = async (req, res, next) => {
	try {
		const userId = await req.currentUserId;
		const project = await ProjectService.getMyProjects(userId);

		res.status(code.OK).json(project);
	} catch (error) {
		next(error);
	}
};

/** @description get Projects by userId */
const getProjects = async (req, res, next) => {
	try {
		const userId = await req.params.id;
		const project = await ProjectService.getProjects(userId);

		res.status(code.OK).json(project);
	} catch (error) {
		next(error);
	}
};

/** @description update project by projectId */
const updateProject = async (req, res, next) => {
	try {
		const projectId = req.params.id;
		const inputValue = req.body;
		const updateProject = await ProjectService.updateProject(
			projectId,
			inputValue,
		);
		res.status(code.CREATED).json(updateProject);
	} catch (error) {
		next(error);
	}
};

/** @description delete project by projectId */
const deleteProject = async (req, res, next) => {
	try {
		const projectId = req.params.id;
		const deletedProject = await ProjectService.deleteProject(projectId);
		res.status(code.NO_CONTENT).json(deletedProject);
	} catch (error) {
		next(error);
	}
};

export { addProject, getProjects, getMyProjects, updateProject, deleteProject };
