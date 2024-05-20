import { ICategory } from '@modules/catalog'
import { IProvider } from '@modules/provider'

export interface ICategoryProviders extends ICategory {
  providers: IProvider[]
}