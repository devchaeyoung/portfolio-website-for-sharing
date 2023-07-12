import { Project } from "../db";

class ProjectService {
    //프로젝트작성 서비스
    static async addProject(
        title,
        role,
        startDate,
        endDate,
        description,
        author
    ) {
        const project = {
            title: title,
            role: role,
            startDate: startDate,
            endDate: endDate,
            description: description,
            author: author,
        };
        const createdNewProject = await Project.create(project);
        return createdNewProject;
    }

    // 프로젝트 목록 서비스
    static async getProject(userId) {
        const projects = await Project.find(userId);
        return projects;
    }

    // 프로젝트 업데이트 서비스. 최적화 필요
    static async setProject({ projectId, toUpdate }) {
        let project = await Project.findById(projectId);
        if (toUpdate.title) {
            const fieldToUpdate = "email";
            const newValue = toUpdate.title;
            project = await Project.update(projectId, fieldToUpdate, newValue);
        }
        if (toUpdate.role) {
            const fieldToUpdate = "role";
            const newValue = toUpdate.role;
            project = await Project.update(projectId, fieldToUpdate, newValue);
        }
        if (toUpdate.startDate) {
            const fieldToUpdate = "startDate";
            const newValue = toUpdate.startDate;
            project = await Project.update(projectId, fieldToUpdate, newValue);
        }
        if (toUpdate.endDate) {
            const fieldToUpdate = "endDate";
            const newValue = toUpdate.endDate;
            project = await Project.update(projectId, fieldToUpdate, newValue);
        }
        if (toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            project = await Project.update(projectId, fieldToUpdate, newValue);
        }

        return project;
    }
}

export { ProjectService };
