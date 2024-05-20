import { IProvider } from '@modules/provider'
import { ICategory, ISubcategory } from '@modules/catalog'
import { IProduct } from '@modules/product/model/IProduct'
import { IPagination } from '@shared/interfaces/IPagination'

export interface ICollection {
  id: number
  name: string
  provider: IProvider
  category: ICategory
  subcategory: ISubcategory | null
  products: IProduct[]
}

export interface ICollectionData extends IPagination {
  data: ICollection[]
}