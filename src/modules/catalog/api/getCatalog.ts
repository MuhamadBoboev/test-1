import { axiosInstance } from '@shared/api/axiosInstance'
import { ICategory } from '@modules/catalog'
import { AxiosResponse } from 'axios'

export async function getCatalog(): Promise<ICategory[] | null> {
  try {
    const response: AxiosResponse<{ data: ICategory[] }> = await axiosInstance.get('/categories')
    return response.data.data
  } catch (e) {
    return null
  }
}