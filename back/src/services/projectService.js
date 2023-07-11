import { Project, User } from "../db";

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
        console.log(createdNewProject);
        return createdNewProject;
    }
}

export { ProjectService };
