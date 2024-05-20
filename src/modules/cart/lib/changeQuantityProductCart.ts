import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProductsCartLocalStorage } from '@modules/cart/lib/getProductsCartLocalStorage'

type Props = {
  productCartId: string
  quantity: number
}

// изменить кол-во товара в корзине
export const changeQuantityProductCart = createAsyncThunk<Props, Props>(
  'cart/changeQuantity',
  async ({productCartId, quantity}) => {
    const productsCartLocal = getProductsCartLocalStorage()
    if (productsCartLocal.hasOwnProperty(productCartId)) {
      productsCartLocal[productCartId] = {
        ...productsCartLocal[productCartId],
        selectedQuantity: quantity,
      }
    }
    localStorage.setItem('cart', JSON.stringify(productsCartLocal))
    return {productCartId, quantity}
  }
)