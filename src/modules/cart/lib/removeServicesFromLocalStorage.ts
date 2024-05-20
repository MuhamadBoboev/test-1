import { getProductsCartLocalStorage } from '@modules/cart/lib/getProductsCartLocalStorage'

// удалить услуги товара из localStorage
export function removeServicesFromLocalStorage(productCartId: string) {
  const productsCartLocalStorage = getProductsCartLocalStorage()
  productsCartLocalStorage[productCartId].selectedServices = []
  localStorage.setItem('cart', JSON.stringify(productsCartLocalStorage))
}