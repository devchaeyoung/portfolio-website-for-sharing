// src/entities/user/model/types.ts
import type { Tables, TablesInsert, TablesUpdate } from '@/shared/types'

/** ── DB 타입 (자동생성 타입 활용) ───────────────────────────────────────── */
export type DbUser = Tables<'users'> // Row
export type DbUserInsert = TablesInsert<'users'> // Insert
export type DbUserUpdate = TablesUpdate<'users'> // Update

/** ── 도메인 타입 (앱에서 사용하는 camelCase) ──────────────────────────── */
export interface User {
  _id: string
  email: string
  name: string
  description?: string
  profileImage?: string
  stacks?: string[]
  role?: string // DB엔 없음(도메인 전용)
  createdAt?: string
  updatedAt?: string
  userId?: string // auth.users.id (필요 시 노출)
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  description?: string
  stacks?: string[]
}

export interface ResetPasswordRequest {
  email: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  description?: string
  stacks?: string[]
  profileImage?: string // 스토리지 업로드 후 갱신용 (DB: profile_image)
}

/** ── 매핑 유틸 ───────────────────────────────────────────────────────── */

// DB(Row) -> 도메인(User)
export function dbUserToUser(row: DbUser): User {
  return {
    _id: row._id,
    email: row.email,
    name: row.name,
    description: row.description ?? undefined,
    profileImage: row.profile_image ?? undefined,
    stacks: row.stacks ?? undefined,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
    userId: row.user_id ?? undefined,
  }
}

// 도메인(UpdateUserRequest) -> DB(Update)
export function userUpdateToDb(update: UpdateUserRequest): DbUserUpdate {
  const out: DbUserUpdate = {}

  if (update.name !== undefined) out.name = update.name
  if (update.email !== undefined) out.email = update.email
  if (update.description !== undefined) out.description = update.description
  if (update.stacks !== undefined) out.stacks = update.stacks
  if (update.profileImage !== undefined) out.profile_image = update.profileImage

  return out
}

// 도메인(RegisterRequest) -> DB(Insert)
// (회원가입 직후 auth.user.id를 받아 user_id에 넣어 사용)
export function userRegisterToDb(
  input: RegisterRequest & { authUserId: string }
): DbUserInsert {
  return {
    user_id: input.authUserId,
    email: input.email,
    name: input.name,
    description: input.description ?? null,
    stacks: input.stacks ?? null,
    profile_image: null,
  }
}
