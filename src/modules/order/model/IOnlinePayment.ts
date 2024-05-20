export interface IOnlinePayment {
  id: number
  order_id: number
  transaction_id: string
  status: string
  created_at: string
  updated_at: string
}