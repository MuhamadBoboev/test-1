import { SelectedServicesType } from '@modules/cart/model/SelectedServicesType'
import { ProductCartState } from '@modules/cart/model/ProductCartState'

interface ReturnType extends SelectedServicesType {
  productCartId: string
}

export function getSelectedServices(productCartState: ProductCartState[]): ReturnType[] {
  const services: ReturnType[] = []
  productCartState.forEach((productCart) => {
    services.push(...productCart.selectedServices.map(selectedService => ({
      productCartId: productCart.productCartId,
      ...selectedService,
    })))
  })
  return services
}