import { AppState } from '@config/redux/store'

// функция для проверки сущесвтования товара в корзине (проверяет по id товара в корзине)
export function isProductExistInCart(state: AppState, productCartId: string) {
  const productsCart = state.cart.products.find(productCart => productCart.productCartId === productCartId)
  return !!productsCart
}

// функция для проверки сущесвтования товара в корзине (проверяет по id товара)
export function isProductExistInCartForProductCard(state: AppState, productId: number) {
  const productsCart = state.cart.products.find(productCart => productCart.product.id === productId)
  return !!productsCart
}