import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosResponse } from 'axios'
import { IShowroom } from '@modules/company/model/IShowroom'

export async function getShowrooms() {
  try {
    const response: AxiosResponse<{data: IShowroom[]}> = await axiosInstance.get('/showrooms')
    return response.data.data
  } catch (e) {
    return []
  }
}