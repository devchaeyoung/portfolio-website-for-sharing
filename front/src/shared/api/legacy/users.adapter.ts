// src/shared/api/legacy/users.adapter.ts
import { userInstance } from '@/entities/user'

export function createUserHandlers() {
  return {
    // GET /user/:userId
    getById: async ({ params }: any) => {
      return await userInstance.getUserById(params.userId)
    },

    // GET /userlist
    list: async () => {
      return await userInstance.getAllUsers()
    },

    // PUT /user/:userId
    update: async ({ params, body }: any) => {
      const { userId } = params
      return await userInstance.updateUser(userId, body)
    },

    // PUT /user/:userId (with image)
    updateWithImage: async ({ params, formData }: any) => {
      const { userId } = params
      return await userInstance.updateUserWithImage(userId, formData)
    },

    // DELETE /user/:userId
    delete: async ({ params }: any) => {
      const { userId } = params
      await userInstance.deleteUser(userId)
      return { message: 'User deleted successfully' }
    },
  }
}
