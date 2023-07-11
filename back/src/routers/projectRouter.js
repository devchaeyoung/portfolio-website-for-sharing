import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { Project } from "../db";
import { userAuthService } from "../services/userService";
import { ProjectService } from "../services/projectService";

const projectRouter = Router();

projectRouter.post("/project", login_required, async function (req, res, next) {
    try {
        const { title, role, startDate, endDate, description } = req.body;

        const author = await userAuthService.getUserInfo({
            user_id: req.currentUserId,
        });

        const project = await Project.create({
            title,
            role,
            startDate,
            endDate,
            author,
            description,
        });

        res.status(200).json(project);
    } catch (err) {
        next(err);
    }
});

projectRouter.get("/project", login_required, async function (req, res, next) {
    // 프로젝트 리스트 수정중.
    try {
        const author = await userAuthService.getUserInfo({
            user_id: req.currentUserId,
        });
        console.log(author.id);
        const projects = await Project.find(author.id);
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});
//
// // 프로젝트 업데이트
// projectRouter.put(
//     "/project/:id",
//     login_required,
//
//     async function (req, res, next) {
//         const user_id = req.params;
//         const { projectName, role, startDate, endDate, description } = req.body;
//
//         const project = await Project.update(user_id, {
//             projectName,
//             role,
//             startDate,
//             endDate,
//             description,
//         });
//
//         res.status(200).send(project);
//     }
// );
//
// // 프로젝트 삭제
// projectRouter.delete(
//     "/project/:id",
//     login_required,
//     async function (req, res, next) {
//         const { id } = req.params;
//         const project = await Project.delete(id);
//
//         res.status(200).send(project);
//     }
// );
//
export { projectRouter };
