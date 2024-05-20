import { axiosInstance } from '@shared/api/axiosInstance'
import { ICategory } from '@modules/catalog'
import { AxiosResponse } from 'axios'

export async function getCategoryBySlug(slug: string): Promise<ICategory | null> {
  try {
    type ResponseType = AxiosResponse<{ data: ICategory }>
    const response: ResponseType = await axiosInstance.get(`/categories/${slug}`)
    return response.data.data
  } catch (e) {
    return null
  }
}