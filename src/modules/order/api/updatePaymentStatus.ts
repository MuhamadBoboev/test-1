import { axiosInstance } from '@shared/api/axiosInstance'

export async function updatePaymentStatus(orderId: number, token: string) {
  if (orderId === 0) {
    return {
      success: false,
      message: 'Произошла ошибка при проверки',
      data: null,
    }
  }
  try {
    const response = await axiosInstance.get(`/orders/update-payment/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status !== 200) {
      throw new Error()
    }
    return {
      success: true,
      message: 'Статус успешно обновлен',
      data: response.data,
    }
  } catch (e) {
    return {
      success: false,
      message: 'Произошла ошибка при проверки',
      data: null,
    }
  }
}