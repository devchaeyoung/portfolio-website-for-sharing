import { ProjectModel } from "../schemas/Project";
import { UserModel } from "../schemas/user";
import mongoose from "mongoose";
import { User } from "./User";
class Project {
    static async create(projectData) {
        const { title, role, startDate, endDate, author, description } =
            projectData;
        return await ProjectModel.create({
            title,
            role,
            startDate,
            endDate,
            author,
            description,
        });
    }

    static async find(id) {
        // 이메일에 해당하는 유저의 프로젝트를 찾는다.
        // id = 1abd2ac2-6052-478a-96b2-55d661c63658
        const projects = await ProjectModel.find({ author: id });
        return projects;
    }
    //
    //     static async update(user_id, projectData) {
    //         const { projectName, role, startDate, endDate, description } =
    //             projectData;
    //         const newProjectData = projectData;
    //         const projectUpdate = await ProjectModel.findByIdAndUpdate(
    //             { author: user_id },
    //             projectData
    //         );
    //         return projectUpdate;
    //     }
    //
    //     //해당 아이디의 project를 삭제한다.
    //     static async delete(projectId) {
    //         const projectDelete = await ProjectModel.findByIdAndDelete(projectId);
    //         return projectDelete;
    //     }
}
export { Project };
