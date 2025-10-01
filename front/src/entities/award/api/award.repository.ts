import type {
  Award,
  CreateAwardRequest,
  UpdateAwardRequest,
} from '../model/types'

export interface AwardRepository {
  // 수상 경력 조회
  getAwardsByUserId(userId: string): Promise<Award[]>
  getAwardById(id: string): Promise<Award>

  // 수상 경력 생성/수정/삭제
  createAward(data: CreateAwardRequest): Promise<Award>
  updateAward(id: string, data: UpdateAwardRequest): Promise<Award>
  deleteAward(id: string): Promise<void>
}
