import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosResponse } from 'axios'
import { ISubcategoryProviders } from '@modules/catalog/model/ISubcategoryProviders'

export async function getSubcategoryProviders(slug: string): Promise<ISubcategoryProviders | null> {
  try {
    type ResponseType = AxiosResponse<{ data: ISubcategoryProviders }>
    const response: ResponseType = await axiosInstance.get(`/subcategories/${slug}/providers`)
    return response.data.data
  } catch (e) {
    return null
  }
}