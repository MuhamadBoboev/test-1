import { ProductCartState } from '@modules/cart/model/ProductCartState'
import { getSelectedProductAttributes } from '@modules/product'

// рассчитать стоимость товаров в корзине (без учёта услуг)
export function calculateTotalPriceCart(productsCart: ProductCartState[]) {
  return productsCart.reduce((total, {
    product: {base_price, attributes},
    selectedAttributes,
    selectedQuantity,
  }) => {
    const selectedAttributeList = getSelectedProductAttributes({
      productAttributes: attributes,
      selectedAttributes,
    })
    const totalAttributesPrice = selectedAttributeList.reduce((total, {price}) => total + price, 0)
    return total + ((base_price + totalAttributesPrice) * selectedQuantity)
  }, 0)
}