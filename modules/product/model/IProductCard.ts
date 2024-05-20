import { IProductAttribute } from '@modules/product/model/IProductAttribute'

export interface IProductCard {
  id: number
  name: string
  image: string
  category: string
  provider: {
    name: string
    slug: string
  } | null
  slug: string
  base_price: number
  discount: number
  attributes: IProductAttribute[]
}