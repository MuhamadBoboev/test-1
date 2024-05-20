import { cartSlice } from '@modules/cart/model/cartSlice'
import { addToCart } from '@modules/cart/lib/addToCart'
import { removeFromCart } from '@modules/cart/lib/removeFromCart'
import { loadProductsCart } from '@modules/cart/lib/loadProductsCart'
import { changeQuantityProductCart } from '@modules/cart/lib/changeQuantityProductCart'
import { Cart } from '@modules/cart/ui/Cart'
import { addServiceToProduct } from '@modules/cart/lib/addServiceToProduct'
import { removeServiceFromCart } from '@modules/cart/lib/removeServiceFromCart'

export { Cart }
export {
  cartSlice,
  addToCart,
  removeFromCart,
  loadProductsCart,
  changeQuantityProductCart,
  addServiceToProduct,
  removeServiceFromCart
}