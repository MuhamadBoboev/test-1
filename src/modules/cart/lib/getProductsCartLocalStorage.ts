import { initCartLocalStorage } from '@modules/cart/lib/initCartLocalStorage'
import { ProductsCartInLocalStorageType } from '@modules/cart/model/ProductsCartInLocalStorageType'

// получить товары корзины из localStorage
export function getProductsCartLocalStorage(): ProductsCartInLocalStorageType {
  initCartLocalStorage()
  const cartProductsLocalStorageRaw = localStorage.getItem('cart')!
  return JSON.parse(cartProductsLocalStorageRaw)
}