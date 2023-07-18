import { ProjectModel } from "../schemas/project";
class Project {
	// 새로운 프로젝트 저장
	static async create(newProject) {
		const createdProject = await ProjectModel.create(newProject);
		return createdProject;
	}

	static async find(userId) {
		const projects = await ProjectModel.find({ author: userId });
		return projects;
	}

	static async findAuthor(userId) {
		const project = await ProjectModel.find({ author: userId });
		return project;
	}

	static async update(projectId, updates) {
		const updateProject = await ProjectModel.findByIdAndUpdate(
			projectId,
			updates,
			{ new: true },
		).exec();
		return updateProject;
	}
	static async delete(projectId) {
		const deletedProject = await ProjectModel.findByIdAndDelete(projectId);
		return deletedProject;
	}
}

export { Project };
