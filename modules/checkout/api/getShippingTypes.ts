import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosResponse } from 'axios'
import { IShippingType } from '@modules/checkout/model/IShippingType'

export const getShippingTypes = createAsyncThunk<IShippingType[]>(
  'checkout/getShippingTypes',
  async () => {
    const response: AxiosResponse<{data: IShippingType[]}> = await axiosInstance.get('/shipping-types')
    return response.data.data
  }
)