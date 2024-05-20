import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '@shared/api/axiosInstance'

export const loadFavoritesIds = createAsyncThunk<number[], string>(
  'favorite/loadProducts',
  async (token) => {
    const response = await axiosInstance.get('/favorites/ids', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
)