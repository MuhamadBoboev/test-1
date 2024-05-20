import { IVacancy } from '@modules/vacancy/model/IVacancy'
import { axiosInstance } from '@shared/api/axiosInstance'

export async function getVacancy(slug: string): Promise<IVacancy | null> {
  try {
    const response = await axiosInstance.get(`/vacancies/${slug}`)
    return response.data.data
  } catch (e) {
    return null
  }
}