import { getProductsCartLocalStorage } from '@modules/cart/lib/getProductsCartLocalStorage'

// удалить товар из localStorage
export function removeProductFromLocalStorage(productCartId: string) {
  const productsCartLocalStorage = getProductsCartLocalStorage()
  delete productsCartLocalStorage[productCartId]
  localStorage.setItem('cart', JSON.stringify(productsCartLocalStorage))
}

// удалить все виды товара из localStorage
export function removeProductByIdFromLocalStorage(productId: number) {
  const productsCartLocalStorage = getProductsCartLocalStorage()
  Object.keys(productsCartLocalStorage).forEach(key => {
    const productCart = productsCartLocalStorage[key]
    if (productCart.productId === productId) {
      delete productsCartLocalStorage[key]
    }
  })
  localStorage.setItem('cart', JSON.stringify(productsCartLocalStorage))
}