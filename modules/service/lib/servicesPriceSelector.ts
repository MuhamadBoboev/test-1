import { getSelectedServices } from '@modules/service'
import { AppState } from '@config/redux/store'

export function servicesPriceSelector(state: AppState) {
  const selectedServices = getSelectedServices(state.cart.products)
  return selectedServices.reduce((total, {service, serviceValue, serviceQuantity}) => {
    return total + service.price * serviceValue * serviceQuantity
  }, 0)
}