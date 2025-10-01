import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserWithProfileImage,
} from '../model/types'

export interface UserRepository {
  // 사용자 조회
  getUserById(id: string): Promise<User>
  getAllUsers(): Promise<User[]>

  // 사용자 생성/수정/삭제
  createUser(data: CreateUserRequest): Promise<User>
  updateUser(id: string, data: UpdateUserRequest): Promise<User>
  deleteUser(id: string): Promise<void>

  // 프로필 이미지 업로드
  updateUserWithImage(id: string, formData: FormData): Promise<User>
}
