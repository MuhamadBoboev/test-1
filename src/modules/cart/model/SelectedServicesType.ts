import { IService } from '@modules/service'

export interface SelectedServicesShortType {
  serviceId: number
  serviceValue: number
  serviceQuantity: number
}

export interface SelectedServicesType extends SelectedServicesShortType {
  service: IService
}