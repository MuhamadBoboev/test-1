import { SelectedServicesType } from '@modules/cart/model/SelectedServicesType'

interface Props {
  selectedServices: SelectedServicesType[]
  productCartServices: SelectedServicesType[]
}

export function checkEqualServices({selectedServices, productCartServices}: Props) {
  if (selectedServices.length !== productCartServices.length) {
    return false
  }
  return selectedServices.every((service) => {
    return !!productCartServices
      .find(productCartService => productCartService.serviceId === service.serviceId)
  })
}