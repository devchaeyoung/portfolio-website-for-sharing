// src/shared/api/legacy/auth.adapter.ts
import { login, register, getCurrentUser, logout, deleteAccount, resetPassword } from '@/entities/user'

export function createAuthHandlers() {
  return {
    // POST /user/login
    login: async ({ body }: any) => {
      const { email, password } = body || {}
      const result = await login({ email, password })
      return {
        token: result.token,
        user: result.user,
      }
    },

    // POST /user/register
    register: async ({ body }: any) => {
      const { email, password, name } = body || {}
      const result = await register({ email, password, name })
      return {
        token: result.token,
        user: result.user,
      }
    },

    // GET /user/current
    getCurrent: async () => {
      return await getCurrentUser()
    },

    // POST /user/reset-password
    resetPassword: async ({ body }: any) => {
      const { email } = body || {}
      await resetPassword(email)
      return { message: 'Password reset email sent' }
    },

    // POST /user/logout
    logout: async () => {
      await logout()
      return { message: 'Logged out successfully' }
    },

    // DELETE /user/account
    deleteAccount: async () => {
      await deleteAccount()
      return { message: 'Account deleted successfully' }
    },
  }
}
