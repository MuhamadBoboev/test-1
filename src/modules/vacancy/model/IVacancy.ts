import { IVacancyCategory } from '@modules/vacancy/model/IVacancyCategory'
import { IPagination } from '@shared/interfaces/IPagination'

export interface IVacancy {
  id: number
  name: string
  category: IVacancyCategory | null
  short_description: string
  description: string
  slug: string
  created_at: string
  updated_at: string
}

export interface IVacanciesData extends IPagination {
  data: IVacancy[]
}
