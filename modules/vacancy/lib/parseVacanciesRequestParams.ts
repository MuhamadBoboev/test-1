import { ParseVacanciesRequestParamsReturnType } from '@modules/vacancy/model/ParseVacanciesRequestParamsReturnType'

type Prop = {
  [key: string]: string | string[]
}

export function parseVacanciesRequestParams(params: Prop): ParseVacanciesRequestParamsReturnType {
  const category_id = isNaN(+params.category_id) ? undefined : +params.category_id
  const page = isNaN(+params.page) ? undefined : +params.page
  const result: ParseVacanciesRequestParamsReturnType = {}

  if (category_id) {
    result.category_id = category_id
  }
  if (page) {
    result.page = page
  }

  return result
}