import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  removeProductByIdFromLocalStorage,
  removeProductFromLocalStorage
} from '@modules/cart/lib/removeProductFromLocalStorage'

// убрать товар в корзине
export const removeFromCart = createAsyncThunk<string, string>(
  'cart/removeFromCart',
  async (productCartId) => {
    removeProductFromLocalStorage(productCartId)
    return productCartId
  }
)

// убрать все виды этой продукты с корзины
export const removeProductFromCart = createAsyncThunk<number, number>(
  'cart/removeProductFromCart',
  async (productId) => {
    removeProductByIdFromLocalStorage(productId)
    return productId
  }
)