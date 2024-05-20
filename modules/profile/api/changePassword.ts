import { axiosInstance } from '@shared/api/axiosInstance'
import { UpdatePasswordFormData } from '@modules/profile/model/UpdatePasswordFormData'
import { AxiosError } from 'axios'

type Props = {
  token: string
  data: UpdatePasswordFormData
}

export async function changePassword({token, data}: Props) {
  try {
    const response = await axiosInstance.post('/user/change-password', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status !== 200) {
      return {
        success: false,
        message: response.data.message
      }
    }
    return {
      success: true,
      message: response.data.message,
    }
  } catch (e) {
    const error = e as AxiosError<{message: string}>
    return {
      success: false,
      message: error.response?.data.message || 'Произошла ошибка!'
    }
  }
}