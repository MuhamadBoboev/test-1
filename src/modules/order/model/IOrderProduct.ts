import { IOrderProductAttribute } from '@modules/order/model/IOrderProductAttribute'
import { IOrderService } from '@modules/order/model/IOrderService'

export interface IOrderProduct {
  id: number
  product_id: number
  product_name: string
  product_sku: string
  product_unit: string | null
  product_base_price: number
  quantity: number
  attributes: IOrderProductAttribute[]
  // services: IOrderService[]
  provider_name: string
  collection_name: string | null
  category_name: string
  subcategory_name: string | null
  product_discount: number
  product_image: string | null
}