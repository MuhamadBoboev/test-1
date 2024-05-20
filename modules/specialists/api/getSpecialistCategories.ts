import { ISpecialistCategory } from '@modules/specialists/model/ISpecialistCategory'
import { axiosInstance } from '@shared/api/axiosInstance'

export async function getSpecialistCategories(): Promise<ISpecialistCategory[] | null> {
  try {
    const response = await axiosInstance.get('/specialist-categories')
    return response.data.data
  } catch (e) {
    return null
  }
}