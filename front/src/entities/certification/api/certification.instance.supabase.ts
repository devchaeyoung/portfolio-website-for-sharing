import { supabase } from '@/shared/api/supabaseClient'
import type {
  Certification,
  CreateCertificationRequest,
  UpdateCertificationRequest,
} from '../model/types'
import type { CertificationRepository } from './certification.repository'

export const certificationInstance: CertificationRepository = {
  async getCertificationsByUserId(userId: string): Promise<Certification[]> {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Certification[]
  },

  async getCertificationById(id: string): Promise<Certification> {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('_id', id)
      .single()

    if (error) throw error
    return data as Certification
  },

  async createCertification(
    data: CreateCertificationRequest
  ): Promise<Certification> {
    const { data: result, error } = await supabase
      .from('certifications')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result as Certification
  },

  async updateCertification(
    id: string,
    data: UpdateCertificationRequest
  ): Promise<Certification> {
    const { data: result, error } = await supabase
      .from('certifications')
      .update(data)
      .eq('_id', id)
      .select()
      .single()

    if (error) throw error
    return result as Certification
  },

  async deleteCertification(id: string): Promise<void> {
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('_id', id)

    if (error) throw error
  },
}
