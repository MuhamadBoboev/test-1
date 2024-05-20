import { AxiosResponse } from 'axios'
import { axiosInstance } from '@shared/api/axiosInstance'
import { IProductsData } from '@modules/product/model/IProduct'

export async function getProducts(query = '') {
  try {
    const response: AxiosResponse<IProductsData> = await axiosInstance.get(`/products${query}`)
    return response.data
  } catch (e) {
    return null
  }
}