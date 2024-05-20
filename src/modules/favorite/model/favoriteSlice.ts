import { createSlice } from '@reduxjs/toolkit'
import { loadFavoritesIds } from '@modules/favorite/api/loadFavoritesIds'

interface FavoriteSliceState {
  products: number[]
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: FavoriteSliceState = {
  products: [],
  status: 'pending'
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    clearFavoriteProducts(state) {
      state.products = []
      state.status = 'fulfilled'
    },
  },
  extraReducers: builder => {
    builder.addCase(loadFavoritesIds.pending, (state) => {
      state.status = 'pending'
    })
    builder.addCase(loadFavoritesIds.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.products = action.payload
    })
    builder.addCase(loadFavoritesIds.rejected, (state) => {
      state.status = 'rejected'
      state.products = []
    })
  }
})

export const {clearFavoriteProducts} = favoriteSlice.actions