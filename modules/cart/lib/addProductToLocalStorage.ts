import { initCartLocalStorage } from '@modules/cart/lib/initCartLocalStorage'
import { ProductCartState } from '@modules/cart/model/ProductCartState'
import { getProductsCartLocalStorage } from '@modules/cart/lib/getProductsCartLocalStorage'

// добавить товар в корзину localStorage
export function addProductToLocalStorage(productCart: ProductCartState) {
  initCartLocalStorage()
  const productsCartLocalStorage = getProductsCartLocalStorage()
  productsCartLocalStorage[productCart.productCartId || productCart.product.id] = {
    productId: productCart.product.id,
    selectedAttributes: productCart.selectedAttributes,
    selectedQuantity: productCart.selectedQuantity,
    withAttribute: !!Object.keys(productCart.selectedAttributes).length,
    selectedServices: productCart.selectedServices.map(selectedService => {
      const {service, ...otherProps} = selectedService
      return otherProps
    }),
  }
  localStorage.setItem('cart', JSON.stringify(productsCartLocalStorage))
}