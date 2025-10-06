// src/shared/api/legacy/index.ts
import { createAuthHandlers } from './auth.adapter'
import { createUserHandlers } from './users.adapter'

export const legacyApi = {
  auth: createAuthHandlers(),
  user: createUserHandlers(),
}
