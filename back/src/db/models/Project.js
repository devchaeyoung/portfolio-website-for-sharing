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

    //ProjectModel 이 참조하는 user의 모든 project를 가져온다.
    static async readAll(user) {
        return ProjectModel.find({ author: user }).populate("author");
    }

    //어차피 전체목록만 나오니깐 쓸일없을듯?
    // static async readOne(projectId) {
    //     const project = await ProjectModel.findById(projectId).populate(
    //         "author"
    //     );
    //     return project;
    // }

    static async update(projectId, projectData) {
        const { projectName, role, startDate, endDate, description } =
            projectData;
        const project = await ProjectModel.findByIdAndUpdate(projectId, {
            projectName,
            role,
            startDate,
            endDate,
            description,
        });
    }

    //해당 아이디의 project를 삭제한다.
    static async delete(projectId) {
        const project = await ProjectModel.findByIdAndDelete(projectId);
    }
}
export { Project };
