import { IProvider } from '@modules/provider'
import { ICategory, ISubcategory } from '@modules/catalog'
import { ICollection } from '@modules/product/model/ICollection'
import { IProductType } from '@modules/product/model/IProductType'
import { IPagination } from '@shared/interfaces/IPagination'
import { IProductAttribute } from '@modules/product/model/IProductAttribute'
import { IProductImage } from '@modules/product/model/IProductImage'
import { IService } from '@modules/service'

export interface IProduct {
  id: number
  name: string
  description: string
  image: string
  images: IProductImage[]
  sku: string
  slug: string
  provider: IProvider
  category: ICategory
  subcategory: ISubcategory | null
  collection: ICollection
  base_price: number
  unit: string | null
  attributes: IProductAttribute[]
  discount: number
  quantity: number
  product_type: IProductType | null
  excluded_services: IService[]
}

export interface IProductsData extends IPagination {
  data: IProduct[]
}