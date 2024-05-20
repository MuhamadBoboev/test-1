import { Vacancies } from '@modules/vacancy/ui/Vacancies'
import { Vacancy } from '@modules/vacancy/ui/Vacancy'
import { getVacancy } from '@modules/vacancy/api/getVacancy'
import { getVacancyCategories } from '@modules/vacancy/api/getVacancyCategories'
import {
  vacancyFilterSlice,
  toggleVacancyFilter,
  closeVacancyFilter,
  openVacancyFilter
} from '@modules/vacancy/model/vacancyFilterSlice'

export { Vacancies, Vacancy }
export {
  getVacancy,
  getVacancyCategories,
  vacancyFilterSlice,
  openVacancyFilter,
  closeVacancyFilter,
  toggleVacancyFilter,
}