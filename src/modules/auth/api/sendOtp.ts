import { axiosInstance } from '@shared/api/axiosInstance'
import { removeSpaces } from '@shared/lib/removeSpaces'
import { AxiosError } from 'axios'

type SendOtpType = {
  success: boolean
  message: string
}

export async function sendOtp(phone: string): Promise<SendOtpType> {
  try {
    const response = await axiosInstance.post('/send-code', {
      phone: removeSpaces(phone),
    })
    return {
      success: response.status === 200,
      message: response.data.message
    }
  } catch (e) {
    const error = e as AxiosError
    return {
      success: false,
      message: error.message,
    }
  }
}