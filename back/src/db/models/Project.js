import { ProjectModel } from "../schemas/project";
class Project {
	// 새로운 프로젝트 저장
	static async create(newProject) {
		const createdProject = await ProjectModel.create(newProject);
		return createdProject;
	}

<<<<<<< HEAD
	static async find(userId) {
		const projects = await ProjectModel.find({ author: userId });
		return projects;
	}
=======
  static async find(userId) {
    const projects = await ProjectModel.find({ author: userId });
    return projects;
  }
>>>>>>> d0bc6aa774116ce09acddce2314017855a3e927c

	static async findById(projectId) {
		const project = await ProjectModel.findById(projectId);
		return project;
	}

	static async update(projectId, updates) {
		const updateProject = await ProjectModel.findByIdAndUpdate(
			projectId,
			updates,
			{ new: true }
		).exec();
		return updateProject;
	}
	static async delete(projectId) {
		const deletedProject = await ProjectModel.findByIdAndDelete(projectId);
		return deletedProject;
	}
}

export { Project };
