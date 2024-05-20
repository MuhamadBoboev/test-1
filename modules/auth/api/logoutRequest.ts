import { axiosInstance } from '@shared/api/axiosInstance'

export async function logoutRequest(token: string) {
  axiosInstance.get('/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).catch(() => {
  })
}