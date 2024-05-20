import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { menuSlice } from '@widgets/Header/model/menuSlice'
import { searchSlice } from '@widgets/Search'
import { authSlice } from '@modules/auth'
import { orderCallSlice } from '@modules/orderCall'
import { filterSlice } from '@modules/product'
import { cartSlice } from '@modules/cart'
import { favoriteSlice } from '@modules/favorite'
import { vacancyFilterSlice } from '@modules/vacancy'
import { checkoutSlice } from '@modules/checkout'
import { orderSlice } from '@modules/order'

export function makeStore() {
  return configureStore({
    reducer: {
      menu: menuSlice.reducer,
      search: searchSlice.reducer,
      auth: authSlice.reducer,
      orderCall: orderCallSlice.reducer,
      filter: filterSlice.reducer,
      cart: cartSlice.reducer,
      favorite: favoriteSlice.reducer,
      vacancyFilter: vacancyFilterSlice.reducer,
      checkout: checkoutSlice.reducer,
      order: orderSlice.reducer,
    }
  })
}

export const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

setupListeners(store.dispatch)