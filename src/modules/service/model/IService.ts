import { IServiceImage } from '@modules/service/model/IServiceImage'
import { IPagination } from '@shared/interfaces/IPagination'

export interface IService {
  id: number
  name: string
  description: string | null
  image: string
  images: IServiceImage[]
  slug: string
  price: number
  unit: string
  sku: string
}

export interface IServiceData extends IPagination {
  data: IService[]
}