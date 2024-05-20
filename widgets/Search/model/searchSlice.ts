import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openSearch(state) {
      state.isOpen = true
    },
    closeSearch(state) {
      state.isOpen = false
    },
    toggleSearch(state) {
      state.isOpen = !state.isOpen
    }
  }
})

export const {
  openSearch,
  closeSearch,
  toggleSearch,
} = searchSlice.actions