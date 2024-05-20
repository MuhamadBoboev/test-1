import { Services } from '@modules/service/ui/Services'
import { getService } from '@modules/service/api/getService'
import { Service } from '@modules/service/ui/Service'
import { IService } from '@modules/service/model/IService'
import { ServicesProductModal } from '@modules/service/ui/ServicesProductModal'
import { getServices } from '@modules/service/api/getServices'
import { servicesPriceSelector } from '@modules/service/lib/servicesPriceSelector'
import { getSelectedServices } from '@modules/service/lib/getSelectedServices'
import { SelectedServices } from '@modules/service/ui/SelectedServices'

export { Services, Service, ServicesProductModal, SelectedServices }
export { getServices, getService, servicesPriceSelector, getSelectedServices }
export type { IService }