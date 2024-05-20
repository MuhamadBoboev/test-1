import { axiosInstance } from '@shared/api/axiosInstance'
import { IService } from '@modules/service/model/IService'

export async function getServices(): Promise<IService[] | null> {
  try {
    const response = await axiosInstance.get(`/services?per_page=1000000`)
    return response.data.data
  } catch (e) {
    console.log(e)
    return null
  }
}