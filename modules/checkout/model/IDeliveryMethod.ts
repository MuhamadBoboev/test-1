
export type DeliveryMethodsKey = 'pickup' | 'shipping'

export interface IDeliveryMethod {
  id: DeliveryMethodsKey
  name: string
}