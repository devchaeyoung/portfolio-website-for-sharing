import { supabase } from '@/shared/api/supabaseClient'
import type {
  Award,
  CreateAwardRequest,
  UpdateAwardRequest,
} from '../model/types'
import type { AwardRepository } from './award.repository'

export const awardInstance: AwardRepository = {
  async getAwardsByUserId(userId: string): Promise<Award[]> {
    const { data, error } = await supabase
      .from('awards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Award[]
  },

  async getAwardById(id: string): Promise<Award> {
    const { data, error } = await supabase
      .from('awards')
      .select('*')
      .eq('_id', id)
      .single()

    if (error) throw error
    return data as Award
  },

  async createAward(data: CreateAwardRequest): Promise<Award> {
    const { data: result, error } = await supabase
      .from('awards')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result as Award
  },

  async updateAward(id: string, data: UpdateAwardRequest): Promise<Award> {
    const { data: result, error } = await supabase
      .from('awards')
      .update(data)
      .eq('_id', id)
      .select()
      .single()

    if (error) throw error
    return result as Award
  },

  async deleteAward(id: string): Promise<void> {
    const { error } = await supabase.from('awards').delete().eq('_id', id)

    if (error) throw error
  },
}
