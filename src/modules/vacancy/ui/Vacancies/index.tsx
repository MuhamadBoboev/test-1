'use client'
import classes from './vacancies.module.scss'
import { IVacancyCategoriesData } from '@modules/vacancy/model/IVacancyCategory'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { Wrapper } from '@shared/ui/Wrapper'
import { SearchParamsType } from '@shared/interfaces/SearchParamsType'
import { VacancyList } from '@modules/vacancy/ui/VacancyList'
import { objectToBackendUrlString } from '@shared/lib/objectToBackendUrlString'
import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { parseVacanciesRequestParams } from '@modules/vacancy/lib/parseVacanciesRequestParams'
import { IVacanciesData } from '@modules/vacancy/model/IVacancy'
import { Loader } from '@shared/ui/Loader'
import { Pagination } from '@shared/ui/Pagination'
import { useRouter } from 'next/navigation'
import { VacancyFilter } from '@modules/vacancy/ui/VacancyFilter'
import { useAppDispatch } from '@shared/lib/redux-hooks'
import { openVacancyFilter } from '@modules/vacancy'
import { HandySvg } from 'handy-svg'

interface Props {
  vacancyCategories: IVacancyCategoriesData
  searchParams: SearchParamsType
}

function Vacancies({vacancyCategories, searchParams}: Props) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const params = parseVacanciesRequestParams(searchParams)
  const vacanciesUrl = `/vacancies?` + objectToBackendUrlString(params as SearchParamsType) + '&per_page=12'
  const {
    data: vacancies,
    isValidating,
    isLoading: isLoadingVacancies,
  } = useSWR<IVacanciesData>(vacanciesUrl, getFetcher)

  if (isLoadingVacancies || isValidating || !vacancies) {
    return <Loader/>
  }

  const handleChangePage = ({selected}: { selected: number }) => {
    const params: any = {
      ...searchParams,
      page: (selected + 1).toString(),
    }
    const query = Object.keys(params).map(key => {
      return `${key}=${params[key].toString()}`
    }).join('&')
    router.push(`/vacancies?${query}`)
  }

  let activePage = isNaN(+searchParams?.page) ? 0 : +searchParams?.page - 1

  return (
    <div className={classes.vacancies}>
      <Wrapper className={classes.wrapper}>
        <Breadcrumbs
          className={classes.breadcrumbs}
          items={[{label: 'Вакансии', isActive: true}]}
          includeHome
        />
        <header className={classes.header}>
          <h1 className={classes.title}>Актуальные вакансии</h1>
          <button
            className={classes.filter}
            aria-label="Открыть фильтр"
            onClick={() => dispatch(openVacancyFilter())}
          >
            <HandySvg
              src="/assets/icons/filter.svg"
              width={32}
              height={32}
            />
          </button>
        </header>
        <div className={classes.content}>
          <VacancyList vacancies={vacancies.data}/>
          {/* <VacancyFilter vacancyCategories={vacancyCategories}/> */}
        </div>
        <Pagination
          forcePage={activePage}
          pageCount={vacancies.meta.last_page}
          onPageChange={handleChangePage}
        />
      </Wrapper>
    </div>
  )
}

export { Vacancies }