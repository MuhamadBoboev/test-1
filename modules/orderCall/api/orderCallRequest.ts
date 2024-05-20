import { OrderCallFormData } from '@modules/orderCall/model/OrderCallFormData'
import { axiosInstance } from '@shared/api/axiosInstance'

export async function orderCallRequest(data: OrderCallFormData) {
  try {
    const response = await axiosInstance.post('/order-call', data)
    return {
      success: true,
      message: response.data.message,
    }
  } catch (e: any) {
    return {
      success: false,
      message: e.response.data.message,
    }
  }
}