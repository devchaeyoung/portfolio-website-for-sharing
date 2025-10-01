import type {
  Education,
  CreateEducationRequest,
  UpdateEducationRequest,
} from '../model/types'

export interface EducationRepository {
  // 교육 경력 조회
  getEducationsByUserId(userId: string): Promise<Education[]>
  getEducationById(id: string): Promise<Education>

  // 교육 경력 생성/수정/삭제
  createEducation(data: CreateEducationRequest): Promise<Education>
  updateEducation(id: string, data: UpdateEducationRequest): Promise<Education>
  deleteEducation(id: string): Promise<void>
}
