import { IProduct } from '@modules/product/model/IProduct'
import { axiosInstance } from '@shared/api/axiosInstance'

export async function getProductsByIds(ids: number[]): Promise<IProduct[]> {
  try {
    const response = await axiosInstance.post('/products/get-by-ids', {
      product_ids: ids
    })
    return response.data.data
  } catch (e) {
    return []
  }
}