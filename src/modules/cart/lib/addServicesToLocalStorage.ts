import { initCartLocalStorage } from '@modules/cart/lib/initCartLocalStorage'
import { getProductsCartLocalStorage } from '@modules/cart/lib/getProductsCartLocalStorage'
import { SelectedServicesShortType } from '@modules/cart/model/SelectedServicesType'

interface Props {
  productCartId: string
  productId: number
  services: SelectedServicesShortType[]
}

// добавить услуги к товару в localStorage
export function addServicesToLocalStorage({
                                            productId,
                                            productCartId,
                                            services,
                                          }: Props) {
  initCartLocalStorage()
  const productsCartLocalStorage = getProductsCartLocalStorage()

  productsCartLocalStorage[productCartId || productId] = {
    ...productsCartLocalStorage[productCartId || productId],
    selectedServices: services,
  }
  localStorage.setItem('cart', JSON.stringify(productsCartLocalStorage))
}