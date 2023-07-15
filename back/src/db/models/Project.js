import { ProjectModel } from "../schemas/project";
class Project {
  // 새로운 프로젝트 저장
  static async create(newProject) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

    static async find(userId) {
        const projects = await ProjectModel.find({ author: userId });
        console.log(projects);
        return projects;
    }

  static async findById(projectId) {
    const project = await ProjectModel.findById(projectId);
    return project;
  }

  static async update(projectId, fieldToUpdate, newValue) {
    const filter = { _id: projectId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updateProject;
  }
  static async delete(projectId) {
    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);
    return deletedProject;
  }
}

export { Project };
