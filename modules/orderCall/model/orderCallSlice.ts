import { createSlice } from '@reduxjs/toolkit'

export const orderCallSlice = createSlice({
  name: 'orderCall',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openOrderCall(state) {
      state.isOpen = true
    },
    closeOrderCall(state) {
      state.isOpen = false
    },
    toggleOrderCall(state) {
      state.isOpen = !state.isOpen
    }
  }
})

export const {
  openOrderCall,
  closeOrderCall,
  toggleOrderCall,
} = orderCallSlice.actions