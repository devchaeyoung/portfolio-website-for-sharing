import type {
  Certification,
  CreateCertificationRequest,
  UpdateCertificationRequest,
} from '../model/types'

export interface CertificationRepository {
  // 자격증 조회
  getCertificationsByUserId(userId: string): Promise<Certification[]>
  getCertificationById(id: string): Promise<Certification>

  // 자격증 생성/수정/삭제
  createCertification(data: CreateCertificationRequest): Promise<Certification>
  updateCertification(
    id: string,
    data: UpdateCertificationRequest
  ): Promise<Certification>
  deleteCertification(id: string): Promise<void>
}
