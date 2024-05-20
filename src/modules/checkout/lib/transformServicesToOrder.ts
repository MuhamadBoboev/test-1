import { SelectedServicesType } from '@modules/cart/model/SelectedServicesType'
import { OrderService } from '@modules/checkout/model/OrderService'

export function transformServicesToOrder(selectedServices: SelectedServicesType[]): OrderService[] {
  return selectedServices.map(({serviceId, serviceValue, serviceQuantity}) => ({
    service_id: serviceId,
    service_value: serviceValue,
    service_quantity: serviceQuantity,
  }))
}