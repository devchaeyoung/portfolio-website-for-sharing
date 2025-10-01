export type Project = {
  _id: string
  user_id: string
  title?: string
  role?: string
  start_date?: string
  end_date?: string
  description?: string
  author: string
  created_at?: string
  updated_at?: string
}

export type CreateProjectRequest = {
  user_id: string
  title?: string
  role?: string
  start_date?: string
  end_date?: string
  description?: string
  author: string
}

export type UpdateProjectRequest = {
  title?: string
  role?: string
  start_date?: string
  end_date?: string
  description?: string
}
