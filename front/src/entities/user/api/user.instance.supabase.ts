import { supabase } from '@/shared/api/supabaseClient'
import type { User, CreateUserRequest, UpdateUserRequest } from '../model/types'
import type { UserRepository } from './user.repository'

export const userInstance: UserRepository = {
  async getUserById(id: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('_id', id)
      .single()

    if (error) throw error
    return data as User
  },

  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as User[]
  },

  async createUser(data: CreateUserRequest): Promise<User> {
    const { data: result, error } = await supabase
      .from('users')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result as User
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    const { data: result, error } = await supabase
      .from('users')
      .update(data)
      .eq('_id', id)
      .select()
      .single()

    if (error) throw error
    return result as User
  },

  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase.from('users').delete().eq('_id', id)

    if (error) throw error
  },

  async updateUserWithImage(id: string, formData: FormData): Promise<User> {
    // Supabase Storage에 파일 업로드
    const file = formData.get('file') as File
    if (!file) throw new Error('No file provided')

    const fileExt = file.name.split('.').pop()
    const fileName = `${id}-${Date.now()}.${fileExt}`
    const filePath = `profiles/${fileName}`

    // Storage에 업로드
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    // Public URL 생성
    const {
      data: { publicUrl },
    } = supabase.storage.from('uploads').getPublicUrl(filePath)

    // 사용자 프로필 이미지 URL 업데이트
    const { data: result, error } = await supabase
      .from('users')
      .update({ profile_image: publicUrl })
      .eq('_id', id)
      .select()
      .single()

    if (error) throw error
    return result as User
  },
}
