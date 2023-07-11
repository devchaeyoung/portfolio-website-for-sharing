import { ProjectModel } from "../schemas/project";
import { UserModel } from "../schemas/user";

class Project {
    // 새로운 프로젝트 저장
    static async create(newProject) {
        const createdNewProject = await ProjectModel.create(newProject);
        return createdNewProject;
    }
    // static async findById({ project_id }) {
    //     // 프로젝트 조회
    //     const project = await UserModel.findOne({ id: project_id });
    //     return project;
    // }
    //
    // //미완
    // static async update({
    //     project_id,
    //     title,
    //     role,
    //     startDate,
    //     endDate,
    //     description,
    //     author,
    // }) {
    //     const updatedProject = await ProjectModel.findOneAndUpdate();
    //     return updatedProject;
    // }
}

export { Project };
