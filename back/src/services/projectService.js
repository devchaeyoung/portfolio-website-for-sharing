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

    static async setProject({ shortId, toUpdate }) {
        let project = await Project.findById(shortId);
        if (toUpdate.title) {
            const fieldToUpdate = "email";
            const newValue = toUpdate.title;
            project = await Project.update(shortId, fieldToUpdate, newValue);
        }
        if (toUpdate.role) {
            const fieldToUpdate = "role";
            const newValue = toUpdate.role;
            project = await Project.update(shortId, fieldToUpdate, newValue);
        }
        if (toUpdate.startDate) {
            const fieldToUpdate = "startDate";
            const newValue = toUpdate.startDate;
            project = await Project.update(shortId, fieldToUpdate, newValue);
        }
        if (toUpdate.endDate) {
            const fieldToUpdate = "endDate";
            const newValue = toUpdate.endDate;
            project = await Project.update(shortId, fieldToUpdate, newValue);
        }
        if (toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            project = await Project.update(shortId, fieldToUpdate, newValue);
        }

        return project;
    }
}

export { ProjectService };
