export type User = {
  _id: string
  user_id: string
  email: string
  name: string
  stacks?: string[]
  description?: string
  profile_image?: string
  created_at?: string
  updated_at?: string
}

export type CreateUserRequest = {
  user_id: string
  email: string
  name: string
  stacks?: string[]
  description?: string
  profile_image?: string
}

export type UpdateUserRequest = {
  name?: string
  email?: string
  stacks?: string[]
  description?: string
  profile_image?: string
}
