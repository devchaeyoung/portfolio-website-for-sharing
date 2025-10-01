export interface Education {
  _id: string
  user_id: string
  title: string
  major: string
  grades: number
  start_date: string
  end_date: string
  author: string
  created_at?: string
  updated_at?: string
}

export interface CreateEducationRequest {
  user_id: string
  title: string
  major: string
  grades: number
  start_date: string
  end_date: string
  author: string
}

export interface UpdateEducationRequest {
  title?: string
  major?: string
  grades?: number
  start_date?: string
  end_date?: string
}
