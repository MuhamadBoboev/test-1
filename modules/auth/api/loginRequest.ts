import { removeSpaces } from '@shared/lib/removeSpaces'
import { axiosInstance } from '@shared/api/axiosInstance'
import { LoginFormData } from '@modules/auth/model/LoginFormData'
import { IUser } from '@modules/auth/model/IUser'
import { AxiosError } from 'axios'

interface Props {
  loginMethod: 'byPhone' | 'byPassword'
  data: LoginFormData
}

type ReturnTypeLogin = {
  success: boolean
  message: string
  token?: string
  user?: IUser
}

export async function loginRequest({data, loginMethod}: Props): Promise<ReturnTypeLogin> {
  try {
    const url = {
      byPhone: '/auth/login',
      byPassword: '/auth/login-by-password',
    }
    const formData: { [key: string]: any } = {
      phone: removeSpaces(data.phone),
    }
    switch (loginMethod) {
      case 'byPhone':
        formData.otp = data.otp
        break
      case 'byPassword':
        formData.password = data.password
        break
    }
    const response = await axiosInstance.post(url[loginMethod], formData)

    if (response.status !== 200) {
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
      message: e.response?.data.message || 'Произошла ошибка',
    }
  }
}