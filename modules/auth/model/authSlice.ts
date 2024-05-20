import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '@modules/auth/model/IUser'
import { logout } from '@modules/auth/lib/logout'

type AuthType = 'login' | 'register'

interface State {
  isOpen: boolean
  type: AuthType
  token: string | null
  user: IUser | null
  url: string | null
}

const initialState: State = {
  isOpen: false,
  type: 'login',
  token: null,
  user: null,
  url: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openAuth(state, action: PayloadAction<AuthType | undefined>) {
      state.isOpen = true
      state.type = action.payload || 'login'
    },
    setAuthLink(state, action: PayloadAction<string | null>) {
      state.url = action.payload
    },
    closeAuth(state) {
      state.isOpen = false
      state.type = 'login'
    },
    toggleAuth(state, action: PayloadAction<AuthType | undefined>) {
      state.isOpen = !state.isOpen
      state.type = action.payload || 'login'
      if (!state.isOpen) {
        state.type = 'login'
      }
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload
    },
    setUserData(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null
      state.token = null
    })
  }
})

export const {
  openAuth,
  closeAuth,
  toggleAuth,
  setToken,
  setUserData,
  setAuthLink,
} = authSlice.actions