import { createAsyncThunk } from '@reduxjs/toolkit'
import { IPaymentMethod } from '@modules/checkout/model/IPaymentMethod'
import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosResponse } from 'axios'

export const getPaymentMethods = createAsyncThunk<IPaymentMethod[]>(
  'checkout/getPaymentMethods',
  async () => {
    const response: AxiosResponse<{ data: IPaymentMethod[] }> = await axiosInstance.get('/payment-methods')
    return response.data.data
  }
)