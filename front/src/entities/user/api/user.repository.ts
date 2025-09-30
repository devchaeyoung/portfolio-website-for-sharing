import type {
  User,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UpdateUserRequest,
} from '../model/types'

export interface UserRepository {
  // 인증
  login(_credentials: LoginRequest): Promise<{ user: User; token: string }>
  register(_userData: RegisterRequest): Promise<{ user: User; token: string }>
  resetPassword(_data: ResetPasswordRequest): Promise<void>
  getCurrentUser(): Promise<User>

  // 사용자 관리
  getUserById(_id: string): Promise<User>
  getAllUsers(): Promise<User[]>
  updateUser(_id: string, _data: UpdateUserRequest): Promise<User>
  updateUserWithImage(_id: string, _formData: FormData): Promise<User>
}
