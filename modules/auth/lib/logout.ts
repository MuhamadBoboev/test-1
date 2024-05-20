import { createAsyncThunk } from '@reduxjs/toolkit'
import { logoutRequest } from '@modules/auth/api/logoutRequest'

export const logout = createAsyncThunk<void, string>(
  'auth/logout',
  async (token) => {
    await logoutRequest(token)
    window.localStorage.removeItem('token')
  }
)