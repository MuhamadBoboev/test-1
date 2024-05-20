import { ICategory, ISubcategory } from '@modules/catalog'
import { IProvider } from '@modules/provider'
import { IProductType } from '@modules/product/model/IProductType'

export interface ProductsRequestInfoType {
  title: string
  search?: string
  categories?: ICategory[]
  subcategories?: ISubcategory[]
  providers?: IProvider[]
  product_type?: IProductType
}