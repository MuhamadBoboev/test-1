import { IPaymentMethod, IShippingLocation, IShippingType } from '@modules/checkout'
import { IOrderStatus } from '@modules/order/model/IOrderStatus'
import { IOrderProduct } from '@modules/order/model/IOrderProduct'
import { IPagination } from '@shared/interfaces/IPagination'
import { IOnlinePayment } from '@modules/order/model/IOnlinePayment'
import { IOrderService } from '@modules/order/model/IOrderService'

export interface IOrder {
  id: number
  payment_method: IPaymentMethod | null
  online_payment: IOnlinePayment | null
  payment_token: string | null
  comment: string | null
  shipping_address: string | null
  shipping_type: IShippingType | null
  shipping_location: IShippingLocation | null
  discount: number
  status: IOrderStatus
  total: number
  sub_total: number
  items: IOrderProduct[]
  services: IOrderService[]
  created_at: string
  updated_at: string
}

export interface IOrderData extends IPagination {
  data: IOrder[]
}