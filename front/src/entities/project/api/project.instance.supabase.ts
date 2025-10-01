import { supabase } from '@/shared/api/supabaseClient'
import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
} from '../model/types'
import type { ProjectRepository } from './project.repository'

export const projectInstance: ProjectRepository = {
  async getProjectsByUserId(userId: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Project[]
  },

  async getProjectById(id: string): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('_id', id)
      .single()

    if (error) throw error
    return data as Project
  },

  async createProject(data: CreateProjectRequest): Promise<Project> {
    const { data: result, error } = await supabase
      .from('projects')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result as Project
  },

  async updateProject(
    id: string,
    data: UpdateProjectRequest
  ): Promise<Project> {
    const { data: result, error } = await supabase
      .from('projects')
      .update(data)
      .eq('_id', id)
      .select()
      .single()

    if (error) throw error
    return result as Project
  },

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase.from('projects').delete().eq('_id', id)

    if (error) throw error
  },
}
