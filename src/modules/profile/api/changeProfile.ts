import { UpdateProfileFormData } from '@modules/profile/model/UpdateProfileFormData'
import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosError } from 'axios'
import { removeSpaces } from '@shared/lib/removeSpaces'

type Props = {
  token: string
  data: UpdateProfileFormData
}

export async function changeProfile({token, data}: Props) {
  try {
    const {name, phone, otp, address} = data
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('name', name)
    formData.append('phone', removeSpaces(phone))
    if (otp?.toString()) {
      formData.append('otp', otp.toString())
    }
    formData.append('address', address?.toString() || '')
    const response = await axiosInstance.post('/user/profile', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return {
      success: true,
      message: response.data.message,
      user: response.data.user,
    }
  } catch (e) {
    const error = e as AxiosError<{ message: string }>
    return {
      success: false,
      message: error.response?.data.message || 'Произошла ошибка!'
    }
  }
}