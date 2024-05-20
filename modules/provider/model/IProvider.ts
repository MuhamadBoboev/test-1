import { ICategory, ISubcategory } from '@modules/catalog'

export interface IProvider {
  id: number
  name: string
  description: string | null
  logo: string
  slug: string
  categories: ICategory[]
  subcategories: ISubcategory[]
  file: string | null
}