const { ProjectService } = require("../services/projectService");
<<<<<<< HEAD
<<<<<<< HEAD
=======
const Joi = require("joi");
>>>>>>> 80c782457e708bedd27d2bbb1e5d4110232ae594
=======
const Joi = require("joi");
>>>>>>> 3153bf5cfc1ef99937543d17446fec6d8f86390b

const postProject = async (req, res, next) => {
    try {
        const { title, role, startDate, endDate, description } = req.body;
        const userId = await req.currentUserId;
        const newProject = await ProjectService.addProject(
            title,
            role,
            startDate,
            endDate,
            description,
            userId
        );
        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
};

const getProjectId = async (req, res, next) => {
    try {
        const userId = await req.params.id;
        const project = await ProjectService.getProject(userId);
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

const getMyProject = async (req, res, next) => {
    try {
        const userId = await req.currentUserId;
        const project = await ProjectService.getProject(userId);
        res.status(200).json(project);
    } catch (error) {
        next(error);
    }
};

<<<<<<< HEAD
<<<<<<< HEAD
const putProject = async (req, res, next) => {
=======
const updateProject = async (req, res, next) => {
>>>>>>> 80c782457e708bedd27d2bbb1e5d4110232ae594
=======
const updateProject = async (req, res, next) => {
>>>>>>> 3153bf5cfc1ef99937543d17446fec6d8f86390b
    try {
        const projectId = req.params.id;
        const changeProject = req.body;
        const updatedProject = await ProjectService.setProject({
            projectId,
            changeProject,
        });
        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
};

const deleteProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const deletedProject = await ProjectService.deleteProject(projectId);
        res.status(200).json(deletedProject);
        res.send("삭제되었습니다.");
    } catch (error) {
        next(error);
    }
};

<<<<<<< HEAD
<<<<<<< HEAD
export { postProject, getProjectId, getMyProject, putProject, deleteProject };
=======
=======
>>>>>>> 3153bf5cfc1ef99937543d17446fec6d8f86390b
export {
    postProject,
    getProjectId,
    getMyProject,
    updateProject,
    deleteProject,
};
<<<<<<< HEAD
>>>>>>> 80c782457e708bedd27d2bbb1e5d4110232ae594
=======
>>>>>>> 3153bf5cfc1ef99937543d17446fec6d8f86390b
