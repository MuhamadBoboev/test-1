import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosResponse } from 'axios'
import { IProduct } from '@modules/product/model/IProduct'

export async function getFavorites(token: string) {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = await axiosInstance.get('/favorites', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.data
  } catch (e) {
    return null
  }
}