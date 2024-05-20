import { OrderService } from '@modules/checkout/model/OrderService'

export interface OrderProduct {
  product_id: number
  quantity: number
  product_attributes: {
    product_attribute_id: number
  }[]
  services: OrderService[]
}