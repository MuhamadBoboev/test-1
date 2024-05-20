import { getProductsCartLocalStorage } from '@modules/cart/lib/getProductsCartLocalStorage'

interface Props {
  productCartId: string
  serviceId: number
}

// удалить услугу из localStorage
export function removeServiceFromLocalStorage({productCartId, serviceId}: Props) {
  const productsCartLocalStorage = getProductsCartLocalStorage()
  const productCartLocal = productsCartLocalStorage[productCartId]
  productsCartLocalStorage[productCartId] = {
    ...productCartLocal,
    selectedServices: productCartLocal.selectedServices
      .filter(selectedService => selectedService.serviceId !== serviceId)
  }
  localStorage.setItem('cart', JSON.stringify(productsCartLocalStorage))
}