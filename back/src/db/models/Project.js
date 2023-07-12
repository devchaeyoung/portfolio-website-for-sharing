import { ProjectModel } from "../schemas/project";
class Project {
    // 새로운 프로젝트 저장
    static async create(newProject) {
        const createdNewProject = await ProjectModel.create(newProject);
        return createdNewProject;
    }
    static async find(userId) {
        // 넘겨받은 유저id로 db에서 프로젝트들 찾아서 반환
        const projects = await ProjectModel.find({ author: userId });
        return projects;
    }

    static async findById(shortId) {
        const project = await ProjectModel.findOne({ shortId: shortId });
        return project;
    }

    static async update(shortId, fieldToUpdate, newValue) {
        // 제공받은 데이터로 프로젝트 업데이트
        const filter = { shortId: shortId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updateProject = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updateProject;
    }
}

export { Project };
