import { initCartLocalStorage } from '@modules/cart/lib/initCartLocalStorage'
import { getProductsCartLocalStorage } from '@modules/cart/lib/getProductsCartLocalStorage'
import { SelectedServicesType } from '@modules/cart/model/SelectedServicesType'

interface Props {
  productId: number
  productCartId: string
  selectedService: SelectedServicesType
}

// добавить услугу к товару в localStorage
export function addServiceToLocalStorage({
                                           productId,
                                           productCartId,
                                           selectedService,
                                         }: Props) {
  initCartLocalStorage()
  const productsCartLocalStorage = getProductsCartLocalStorage()
  const productCartLocal = productsCartLocalStorage[productCartId || productId]
  const selectedServices = productCartLocal.selectedServices
  if (!selectedServices.find(({serviceId}) => selectedService.serviceId)) {
    const {service, ...otherProps} = selectedService
    selectedServices.push({
      ...otherProps,
    })
  }
  productsCartLocalStorage[productCartId || productId] = {
    ...productCartLocal,
    selectedServices,
  }
  localStorage.setItem('cart', JSON.stringify(productsCartLocalStorage))
}