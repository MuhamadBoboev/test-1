import { axiosInstance } from '@shared/api/axiosInstance'
import { ISpecialist } from '@modules/specialists/model/ISpecialist'

export async function getSpecialist(slug: string): Promise<ISpecialist | null> {
  try {
    const response = await axiosInstance.get(`/specialists/${slug}`)
    return response.data.data
  } catch (e) {
    return null
  }
}