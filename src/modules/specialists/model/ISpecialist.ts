import { ISpecialistCategory } from '@modules/specialists/model/ISpecialistCategory'
import { IPagination } from '@shared/interfaces/IPagination'
import { ISpecialistImage } from '@modules/specialists/model/ISpecialistImage'

export interface ISpecialist {
  id: number
  name: string
  avatar: string | null
  category: ISpecialistCategory
  slug: string
  specialization: string
  experience: string | null
  description: string | null
  images: ISpecialistImage[]
  phone: string | null
  instagram: string | null
  created_at: string
  updated_at: string
}

export interface ISpecialistsData extends IPagination {
  data: ISpecialist[]
}