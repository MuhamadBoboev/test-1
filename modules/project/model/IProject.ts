import { IProjectImage } from '@modules/project/model/IProjectImage'
import { IPagination } from '@shared/interfaces/IPagination'

export interface IProject {
  id: number
  title: string
  slug: string
  image: string
  images: IProjectImage[]
  short_description: string | null
  description: string | null
}

export interface IProjectData extends IPagination {
  data: IProject[]
}
