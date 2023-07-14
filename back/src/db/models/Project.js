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
  // 361ad353-8dd9-4312-82be-9f19a2bb58ec

  static async findById(projectId) {
    const project = await ProjectModel.findById(projectId);
    return project;
  }

  static async update(projectId, toUpdate) {
    const findProject = await ProjectModel.findById(projectId);
    const updateProject = toUpdate.map(async (update) => {
      await ProjectModel.findOneAndUpdate(findProject, update);
    });
    await Promise.all(updateProject);
    return updateProject;
  }
  static async delete(projectId) {
    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);
    return deletedProject;
  }
}

export { Project };
