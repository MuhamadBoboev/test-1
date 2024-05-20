import { ICategory } from '@modules/catalog/model/ICategory'
import { ISubcategory } from '@modules/catalog/model/ISubcategory'
import { getCatalog } from '@modules/catalog/api/getCatalog'
import { CategoryProviders } from '@modules/catalog/ui/CategoryProviders'
import { SubcategoryProviders } from '@modules/catalog/ui/SubcategoryProviders'
import { getSubcategoryProviders } from '@modules/catalog/api/getSubcategoryProviders'
import { getCategoryProviders } from '@modules/catalog/api/getCategoryProviders'

export type { ICategory, ISubcategory }
export { CategoryProviders, SubcategoryProviders }
export { getCatalog, getCategoryProviders, getSubcategoryProviders }