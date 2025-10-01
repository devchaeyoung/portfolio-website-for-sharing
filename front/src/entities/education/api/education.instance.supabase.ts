import { supabase } from '@/shared/api/supabaseClient'
import type {
  Education,
  CreateEducationRequest,
  UpdateEducationRequest,
} from '../model/types'
import type { EducationRepository } from './education.repository'

export const educationInstance: EducationRepository = {
  async getEducationsByUserId(userId: string): Promise<Education[]> {
    const { data, error } = await supabase
      .from('educations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Education[]
  },

  async getEducationById(id: string): Promise<Education> {
    const { data, error } = await supabase
      .from('educations')
      .select('*')
      .eq('_id', id)
      .single()

    if (error) throw error
    return data as Education
  },

  async createEducation(data: CreateEducationRequest): Promise<Education> {
    const { data: result, error } = await supabase
      .from('educations')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result as Education
  },

  async updateEducation(
    id: string,
    data: UpdateEducationRequest
  ): Promise<Education> {
    const { data: result, error } = await supabase
      .from('educations')
      .update(data)
      .eq('_id', id)
      .select()
      .single()

    if (error) throw error
    return result as Education
  },

  async deleteEducation(id: string): Promise<void> {
    const { error } = await supabase.from('educations').delete().eq('_id', id)

    if (error) throw error
  },
}
