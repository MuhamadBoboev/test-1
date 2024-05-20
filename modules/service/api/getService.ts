import { axiosInstance } from '@shared/api/axiosInstance'
import { IService } from '@modules/service/model/IService'

export async function getService(slug: string): Promise<IService | null> {
  try {
    const response = await axiosInstance.get(`/services/${slug}`)
    return response.data.data
  } catch (e) {
    console.log(e)
    return null
  }
}