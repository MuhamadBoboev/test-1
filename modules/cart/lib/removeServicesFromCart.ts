import { createAsyncThunk } from '@reduxjs/toolkit'
import { removeServicesFromLocalStorage } from '@modules/cart/lib/removeServicesFromLocalStorage'

interface Props {
  productCartId: string
}

// удалить все услуги товара из корзины
export const removeServicesFromCart = createAsyncThunk<string, Props>(
  'cart/removeServicesFromCart',
  async ({productCartId}) => {
    removeServicesFromLocalStorage(productCartId)
    return productCartId
  }
)