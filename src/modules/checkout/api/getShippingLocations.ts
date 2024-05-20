import { createAsyncThunk } from '@reduxjs/toolkit'
import { IShippingLocation } from '@modules/checkout/model/IShippingLocation'
import { axiosInstance } from '@shared/api/axiosInstance'
import { AxiosResponse } from 'axios'

export const getShippingLocations = createAsyncThunk<IShippingLocation[]>(
  'checkout/getShippingLocations',
  async () => {
    const response: AxiosResponse<{data: IShippingLocation[]}> = await axiosInstance.get('/shipping-locations')
    return response.data.data
  }
)