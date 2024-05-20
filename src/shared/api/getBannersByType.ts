import { BannerType, IBanner } from '@shared/interfaces/IBanner'
import { AxiosResponse } from 'axios'
import { axiosInstance } from '@shared/api/axiosInstance'

export async function getBannersByType(type: BannerType = 'main'): Promise<IBanner[] | null> {
  try {
    const response: AxiosResponse<{ data: IBanner[] }> = await axiosInstance.get(`/banners/${type}`)
    return response.data.data
  } catch (e) {
    return null
  }
}