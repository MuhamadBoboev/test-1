import { IProvider } from '@modules/provider'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '@shared/api/axiosInstance'

export async function getProvider(slug: string): Promise<IProvider | null> {
  try {
    const response: AxiosResponse<{ data: IProvider }> = await axiosInstance.get(`/providers/${slug}`)
    return response.data.data
  } catch (e) {
    return null
  }
}