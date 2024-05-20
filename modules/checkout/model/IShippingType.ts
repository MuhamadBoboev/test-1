export interface IShippingType {
  id: number
  key: string
  name: string
  description: string | null
  price: number | null
  is_active: boolean
}