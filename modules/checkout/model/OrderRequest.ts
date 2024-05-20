import { OrderProduct } from '@modules/checkout/model/OrderProduct'

export interface OrderRequest {
  payment_method_id: number
  comment?: string
  shipping_address?: string
  shipping_type_id?: number
  shipping_location_id?: number
  products: OrderProduct[]
}