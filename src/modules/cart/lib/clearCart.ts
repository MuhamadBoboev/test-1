import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearCartLocalStorage } from '@modules/cart/lib/clearCartLocalStorage'

// очистить корзину
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async () => {
    clearCartLocalStorage()
  }
)