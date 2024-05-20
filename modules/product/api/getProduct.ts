import { AxiosResponse } from 'axios'
import { axiosInstance } from '@shared/api/axiosInstance'
import { IProduct } from '@modules/product/model/IProduct'

export async function getProduct(slug: string): Promise<IProduct | null> {
  try {
    const response: AxiosResponse<{data: IProduct}> = await axiosInstance.get(`/products/${slug}`)
    return response.data.data
  } catch (e) {
    return null
  }
}