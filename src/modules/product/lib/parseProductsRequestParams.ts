import { parseArrayUrlParam } from '@shared/lib/parseArrayUrlParam'
import { parseStringUrlParam } from '@shared/lib/parseStringUrlParam'
import { ParseProductRequestParamsReturnType } from '@modules/product/model/ParseProductRequestParamsReturnType'

type Prop = {
  [key: string]: string | string[]
}

export function parseProductsRequestParams(params: Prop): ParseProductRequestParamsReturnType {
  const category_id = parseArrayUrlParam(params.categories)
  const subcategory_id = parseArrayUrlParam(params.subcategories)
  const provider_id = parseArrayUrlParam(params.providers)
  const collection_id = parseArrayUrlParam(params.collections)
  const product_type = parseStringUrlParam(params.product_type)
  const search = parseStringUrlParam(params.search)
  const page = parseStringUrlParam(params.page)
  const result: { [key: string]: any } = {}

  if (category_id) {
    result.category_id = category_id
  }
  if (subcategory_id) {
    result.subcategory_id = subcategory_id
  }
  if (provider_id) {
    result.provider_id = provider_id
  }
  if (collection_id) {
    result.collection_id = collection_id
  }
  if (product_type) {
    result.product_type = product_type
  }
  if (search) {
    result.search = search
  }
  if (page) {
    result.page = page
  }

  return result
}