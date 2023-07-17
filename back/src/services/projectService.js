import { Project } from "../db";

class ProjectService {
	//프로젝트작성
	static async createProject(userId, inputValue) {
		const newProject = { ...inputValue, author: userId };
		const createdProject = await Project.create(newProject);
		return createdProject;
	}

	// 프로젝트 목록
	static async getMyProjects(userId) {
		const projects = await Project.find(userId);
		return projects;
	}

	static async getProjects(userId) {
		console.log(userId);
		const projects = await Project.findById(userId);
		return projects;
	}

	// 프로젝트 업데이트
	static async updateProject(projectId, inputValue) {
		const updates = Object.entries(inputValue).reduce(
			(acc, [key, value]) => {
				if (value !== undefined) {
					acc[key] = value;
				}
				return acc;
			},
			{},
		);
		const updateProject = await Project.update(projectId, updates);
		return updateProject;
	}

	// 프로젝트 삭제
	static async deleteProject(projectId) {
		const deletedProject = await Project.delete(projectId);
		return deletedProject;
	}
}

export { ProjectService };
