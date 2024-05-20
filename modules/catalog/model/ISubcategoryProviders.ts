import { ICategory, ISubcategory } from '@modules/catalog'
import { IProvider } from '@modules/provider'

export interface ISubcategoryProviders extends ISubcategory {
  category: ICategory
  providers: IProvider[]
}