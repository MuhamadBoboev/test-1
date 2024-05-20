export interface IPaymentMethod {
  id: number
  key: string
  name: string
  description: string | null
  icon: string
  is_active: boolean
}