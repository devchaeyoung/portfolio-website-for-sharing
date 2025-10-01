export interface Certification {
  _id: string
  user_id: string
  title: string
  license: number
  issued_date: string
  issuer: string
  langscore?: number
  author: string
  created_at?: string
  updated_at?: string
}

export interface CreateCertificationRequest {
  user_id: string
  title: string
  license: number
  issued_date: string
  issuer: string
  langscore?: number
  author: string
}

export interface UpdateCertificationRequest {
  title?: string
  license?: number
  issued_date?: string
  issuer?: string
  langscore?: number
}
