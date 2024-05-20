import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosResponse } from 'axios'
import { ICategoryProviders } from '@modules/catalog/model/ICategoryProviders'

export async function getCategoryProviders(slug: string): Promise<ICategoryProviders | null> {
  try {
    type ResponseType = AxiosResponse<{ data: ICategoryProviders }>
    const response: ResponseType = await axiosInstance.get(`/categories/${slug}/providers`)
    return response.data.data
  } catch (e) {
    return null
  }
}