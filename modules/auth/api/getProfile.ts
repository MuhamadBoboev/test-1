import { axiosInstance } from '@shared/api/axiosInstance'
import { IUser } from '@modules/auth/model/IUser'

export async function getProfile(token: string | null): Promise<IUser | null> {
  if (!token) {
    return null
  }
  try {
    const response = await axiosInstance.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (e) {
    return null
  }
}