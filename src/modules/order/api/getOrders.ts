import { IOrderData } from '@modules/order/model/IOrder'
import { axiosInstance } from '@shared/api/axiosInstance'

export async function getOrders(url: string, token: string): Promise<IOrderData> {
  const response = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}