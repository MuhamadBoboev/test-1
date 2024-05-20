import { AxiosError, AxiosResponse } from 'axios'
import { axiosInstance } from '@shared/api/axiosInstance'

export async function toggleFavorite(productId: number, token: string) {
  try {
    type ResponseType = {
      added: boolean
      message: string
    }
    const response: AxiosResponse<ResponseType> = await axiosInstance.post(`/favorites/${productId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return {
      success: true,
      ...response.data,
    }
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    return {
      success: false,
      added: false,
      message: error.response?.data?.message || 'Произошла ошибка'
    }
  }
}