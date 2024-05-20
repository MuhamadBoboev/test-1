import { IService } from '@modules/service'

export interface ISubcategory {
  id: number
  name: string
  description: string
  slug: string
  icon: string | null
  order: number | null
  category_id: number
  services: IService[]
  created_at: string
  updated_at: string
}