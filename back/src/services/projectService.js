import { Project } from "../db";

class ProjectService {
    //프로젝트작성 서비스
    static async addProject(
        title,
        role,
        startDate,
        endDate,
        description,
        userId
    ) {
        const project = {
            title: title,
            role: role,
            startDate: startDate,
            endDate: endDate,
            description: description,
            author: userId,
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
    static async setProject({ projectId, changeProject }) {
        let project = await Project.findById(projectId);
        const { title, role, startDate, endDate, description } = changeProject;
        const toUpdate = [];
        if (title !== project.title) toUpdate.push({ title });
        if (role !== project.role) toUpdate.push({ role });
        if (startDate !== project.startDate) toUpdate.push({ startDate });
        if (endDate !== project.endDate) toUpdate.push({ endDate });
        if (description !== project.description) toUpdate.push({ description });

        await Project.update(projectId, toUpdate);

        return project;
    }

    // 프로젝트 삭제 서비스
    static async deleteProject(projectId) {
        const deletedProject = await Project.delete(projectId);
        return deletedProject;
    }
}

export { ProjectService };
