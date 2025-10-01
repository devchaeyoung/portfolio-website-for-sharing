export interface Award {
  _id: string
  user_id: string
  title?: string
  info?: string
  issuer?: string
  date: string
  author: string
  created_at?: string
  updated_at?: string
}

export interface CreateAwardRequest {
  user_id: string
  title?: string
  info?: string
  issuer?: string
  date: string
  author: string
}

export interface UpdateAwardRequest {
  title?: string
  info?: string
  issuer?: string
  date?: string
}
