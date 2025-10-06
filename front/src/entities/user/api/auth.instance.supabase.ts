import { supabase } from '@/shared/api/supabaseClient'
import type { User } from '../model/types'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: User
  token: string
}

/**
 * Login user with email and password
 * Legacy: POST /user/login
 */
export const login = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  // 1. Supabase Auth로 로그인
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

  if (authError) throw authError
  if (!authData.user || !authData.session) {
    throw new Error('Login failed: No user or session')
  }

  // 2. public.users 테이블에서 프로필 정보 조회
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', authData.user.id)
    .single()

  if (userError) throw userError
  if (!userData) {
    throw new Error('User profile not found')
  }

  return {
    user: userData as User,
    token: authData.session.access_token,
  }
}

/**
 * Register new user
 * Legacy: POST /user/register
 */
export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  // 1. Supabase Auth에 사용자 생성
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (authError) throw authError
  if (!authData.user || !authData.session) {
    throw new Error('Registration failed: No user or session')
  }

  // 2. public.users 테이블에 프로필 정보 생성
  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({
      user_id: authData.user.id,
      email: data.email,
      name: data.name,
      description: '자신을 자유롭게 표현해주세요.',
    })
    .select()
    .single()

  if (userError) {
    // 프로필 생성 실패 시 Auth 유저도 삭제 (rollback)
    await supabase.auth.admin.deleteUser(authData.user.id)
    throw userError
  }

  return {
    user: userData as User,
    token: authData.session.access_token,
  }
}

/**
 * Get current logged-in user
 * Legacy: GET /user/current
 */
export const getCurrentUser = async (): Promise<User> => {
  // 1. 현재 세션 확인
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) throw sessionError
  if (!session?.user) {
    throw new Error('No active session')
  }

  // 2. public.users 테이블에서 프로필 정보 조회
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  if (userError) throw userError
  if (!userData) {
    throw new Error('User profile not found')
  }

  return userData as User
}

/**
 * Logout current user
 */
export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Delete user account (탈퇴)
 */
export const deleteAccount = async (): Promise<void> => {
  // 1. 현재 세션 확인
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) throw sessionError
  if (!session?.user) {
    throw new Error('No active session')
  }

  // 2. public.users 테이블에서 프로필 삭제 (RLS로 자동 권한 체크)
  const { error: userError } = await supabase
    .from('users')
    .delete()
    .eq('user_id', session.user.id)

  if (userError) throw userError

  // 3. Auth 유저 삭제는 Supabase Admin API 필요 (서버에서 처리해야 함)
  // 현재는 프로필만 삭제하고 로그아웃
  await logout()
}

/**
 * Reset password (비밀번호 재설정 이메일 전송)
 * Legacy: POST /user/reset-password
 */
export const resetPassword = async (email: string): Promise<void> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) throw error
}
