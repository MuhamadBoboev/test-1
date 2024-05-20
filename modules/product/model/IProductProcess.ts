
export type ProductProcessesTabsType = 'delivery' | 'payment' | 'pickup'

export interface IProductProcess {
  key: ProductProcessesTabsType
  title: string
  content: string
}