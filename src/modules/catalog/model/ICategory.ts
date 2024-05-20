import { ISubcategory } from '@modules/catalog/model/ISubcategory'
import { IService } from '@modules/service'

export interface ICategory {
  id: number
  name: string
  description: string
  slug: string
  icon: string
  order: number | null
  subcategories: ISubcategory[]
  services: IService[]
  created_at: string
  updated_at: string
}