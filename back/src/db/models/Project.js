import { ProjectModel } from "../schemas/Project";
class Project {
    static async create(projectData) {
        const { projectName, role, startDate, endDate, author, description } =
            projectData;
        return await ProjectModel.create({
            projectName,
            role,
            startDate,
            endDate,
            author,
            description,
        });
    }

    //     //ProjectModel 이 참조하는 user의 모든 project를 가져온다.
    //     static async readAll(id) {
    //         const projectRead = await ProjectModel.find({ author: id }).populate(
    //             "author"
    //         );
    //         return projectRead;
    //     }
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
