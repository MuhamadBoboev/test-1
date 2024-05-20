import { createSlice } from '@reduxjs/toolkit'

export const vacancyFilterSlice = createSlice({
  name: 'vacancyFilter',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openVacancyFilter(state) {
      state.isOpen = true
    },
    closeVacancyFilter(state) {
      state.isOpen = false
    },
    toggleVacancyFilter(state) {
      state.isOpen = !state.isOpen
    }
  }
})

export const {
  openVacancyFilter,
  closeVacancyFilter,
  toggleVacancyFilter,
} = vacancyFilterSlice.actions