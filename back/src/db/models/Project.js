import { ProjectModel } from "../schemas/project";
import { UserModel } from "../schemas/user";

class Project {
    // 새로운 프로젝트 저장
    static async create(newProject) {
        const createdNewProject = await ProjectModel.create(newProject);
        return createdNewProject;
    }
    static async find(id) {
        // 넘겨받은 유저id로 db에서 프로젝트들 찾아서 반환
        const projects = await ProjectModel.find(id);
        console.log(projects);
        return projects;
    }

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
