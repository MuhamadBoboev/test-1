import { axiosInstance } from '@shared/api/axiosInstance'
import { IService } from '@modules/service'

export async function getServicesByIds(ids: number[]): Promise<IService[]> {
  try {
    const response = await axiosInstance.post('/services/get-by-ids', {
      service_ids: ids
    })
    return response.data.data
  } catch (e) {
    return []
  }
}