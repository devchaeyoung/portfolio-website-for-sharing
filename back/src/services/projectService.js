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
        console.log(project, " 서비스 프로젝트");
        const createdNewProject = await Project.create(project);
        return createdNewProject;
    }

    static async getProject(userId) {
        // 넘겨받은 유저id를 모델에 넘김
        const projects = await Project.find(userId);
        return projects;
    }

    static async updateProject(
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
        const updatedProject = await Project.update(project);
        return updatedProject;
    }
}

export { ProjectService };
