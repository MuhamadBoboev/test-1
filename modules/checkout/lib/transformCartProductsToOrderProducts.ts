import { ProductCartState } from '@modules/cart/model/ProductCartState'
import { OrderProduct } from '@modules/checkout/model/OrderProduct'
import { getSelectedProductAttributes } from '@modules/product/lib/getSelectedProductAttributes'
import { transformServicesToOrder } from '@modules/checkout/lib/transformServicesToOrder'

export function transformCartProductsToOrderProducts(cartProducts: ProductCartState[]): OrderProduct[] {
  return cartProducts.map(({product, selectedQuantity, selectedAttributes, selectedServices}) => {
    const productAttributes = getSelectedProductAttributes({
      selectedAttributes,
      productAttributes: product.attributes,
    })

    return {
      product_id: product.id,
      quantity: selectedQuantity || 1,
      product_attributes: productAttributes.map(({id}) => ({
        product_attribute_id: id,
      })),
      services: transformServicesToOrder(selectedServices),
    }
  })
}