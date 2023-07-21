import { Project } from "../db";

class ProjectService {
	/** @description 디코드된 토큰에서 추출된 userId를 author 로 프로젝트를 작성합니다. */
	static async createProject(userId, inputValue) {
		const newProject = { ...inputValue, author: userId };
		const createdProject = await Project.create(newProject);
		return createdProject;
	}

	/** @description 디코드된 토큰에서 추출된 userId로 작성된 프로젝트를 반환합니다 */
	static async getMyProjects(userId) {
		const projects = await Project.find(userId);
		return projects;
	}

	/** @description path param 의 userId로 작성된 프로젝트를 반환합니다 */
	static async getProjects(userId) {
		const projects = await Project.findAuthor(userId);
		return projects;
	}

	/** @description path param 의 projectId로 프로젝트를 찾아 업데이트 합니다 */
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

	/** @description path param 의 projectId의 프로젝트를 삭제합니다 */
	static async deleteProject(projectId) {
		const deletedProject = await Project.delete(projectId);
		return deletedProject;
	}
}

export { ProjectService };
