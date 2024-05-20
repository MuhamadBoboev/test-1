import { removeSpaces } from '@shared/lib/removeSpaces'
import { axiosInstance } from '@shared/api/axiosInstance'
import { LoginFormData } from '@modules/auth/model/LoginFormData'
import { IUser } from '@modules/auth/model/IUser'
import { AxiosError } from 'axios'

type Props = LoginFormData

type ReturnTypeRegister = {
  success: boolean
  message: string
  token?: string
  user?: IUser
}

export async function registerRequest(data: Props): Promise<ReturnTypeRegister> {
  try {
    const {phone, ...registerData} = data
    const formData: { [key: string]: any } = {
      phone: removeSpaces(data.phone),
      ...registerData
    }
    const response = await axiosInstance.post('/auth/register', formData)
    if (response.status !== 201) {
      return {
        success: false,
        message: response.data.message
      }
    }
    return {
      success: true,
      message: response.data.message,
      token: response.data.token,
      user: response.data.user,
    }
  } catch (error) {
    const e = error as AxiosError<{message: string}>
    return {
      success: false,
      message: e.response?.data.message || 'Произошла ошибка!',
    }
  }
}