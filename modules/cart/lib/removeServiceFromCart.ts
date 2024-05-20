import { createAsyncThunk } from '@reduxjs/toolkit'
import { removeServiceFromLocalStorage } from '@modules/cart/lib/removeServiceFromLocalStorage'

interface Props {
  productCartId: string
  serviceId: number
}

// убрать услугу из товара
export const removeServiceFromCart = createAsyncThunk<Props, Props>(
  'cart/removeServiceFromCart',
  async (payload) => {
    removeServiceFromLocalStorage(payload)
    return payload
  }
)