import { objectToFrontendUrlString } from '@shared/lib/objectToFrontendUrlString'

type Props = {
  categories: number[]
  subcategories: number[]
  providers: number[]
}

export function getUrlFromFilterObject({categories, subcategories, providers}: Props) {
  const params: {
    [key: string]: number[] | number | string
  } = {
    categories,
    subcategories,
    providers,
  }

  Object.keys(params).forEach(key => {
    const param = params[key]
    if (Array.isArray(param)) {
      if (param.length === 0) {
        delete params[key]
      }
    } else {
      if (!param) {
        delete params[key]
      }
    }
  })

  return objectToFrontendUrlString(params)
}