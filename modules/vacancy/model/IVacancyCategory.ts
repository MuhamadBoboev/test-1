export interface IVacancyCategory {
  id: number
  name: string
  vacancies_count: number
}

export interface IVacancyCategoriesData {
  data: IVacancyCategory[]
  total_vacancies: number
}