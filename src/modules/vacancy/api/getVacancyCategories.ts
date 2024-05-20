import { axiosInstance } from '@shared/api/axiosInstance'
import { IVacancyCategoriesData, IVacancyCategory } from '@modules/vacancy/model/IVacancyCategory'
import { AxiosResponse } from 'axios'

export async function getVacancyCategories(): Promise<IVacancyCategoriesData | null> {
  try {
    const response: AxiosResponse<IVacancyCategoriesData> = await axiosInstance.get('/vacancy-categories?filter=1')
    return response.data
  } catch (e) {
    return null
  }
}