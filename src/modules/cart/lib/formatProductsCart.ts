import { getMaxQuantity, IProduct } from '@modules/product'
import { ProductCartState } from '@modules/cart/model/ProductCartState'
import { getProductsCartLocalStorage } from '@modules/cart/lib/getProductsCartLocalStorage'
import { removeProductFromLocalStorage } from '@modules/cart/lib/removeProductFromLocalStorage'
import { IService } from '@modules/service'
import { SelectedServicesType } from '@modules/cart/model/SelectedServicesType'

interface Props {
  loadedProducts: IProduct[]
  loadedServices: IService[]
}

// форматирует обычные товары к товарам который находится в корзине
export function formatProductsCart({loadedProducts, loadedServices}: Props): ProductCartState[] {
  const products: ProductCartState[] = []
  const productsCartLocalStorage = getProductsCartLocalStorage()
  Object.keys(productsCartLocalStorage).forEach(key => {
    const productCartLocal = productsCartLocalStorage[key]
    const product = loadedProducts.find(product => product.id === productCartLocal.productId)
    if (product) {
      const selectedServices: SelectedServicesType[] = []
      productCartLocal.selectedServices.forEach(selectedService => {
        const service = loadedServices.find(({id}) => selectedService.serviceId === id)
        if (!service) {
          return
        }
        selectedServices.push({
          ...selectedService,
          service,
        })
      })
      const productCart: ProductCartState = {
        productCartId: key,
        selectedAttributes: productCartLocal.selectedAttributes,
        selectedQuantity: productCartLocal.selectedQuantity,
        product,
        selectedServices,
      }
      const maxQuantity = getMaxQuantity({
        productAttributes: product.attributes,
        selectedAttributes: productCart.selectedAttributes,
        productQuantity: product.quantity,
      })
      if (maxQuantity) {
        if (maxQuantity < productCart.selectedQuantity) {
          productCart.selectedQuantity = maxQuantity
        }
        products.push(productCart)
      } else {
        removeProductFromLocalStorage(key)
      }
    } else {
      removeProductFromLocalStorage(key)
    }
  })

  return products
}