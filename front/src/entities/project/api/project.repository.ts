import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
} from '../model/types'

export interface ProjectRepository {
  // 프로젝트 조회
  getProjectsByUserId(userId: string): Promise<Project[]>
  getProjectById(id: string): Promise<Project>

  // 프로젝트 생성/수정/삭제
  createProject(data: CreateProjectRequest): Promise<Project>
  updateProject(id: string, data: UpdateProjectRequest): Promise<Project>
  deleteProject(id: string): Promise<void>
}
