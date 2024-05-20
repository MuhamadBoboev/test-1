import classes from './vacancy-filter.module.scss'
import { IVacancyCategoriesData } from '@modules/vacancy/model/IVacancyCategory'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { closeVacancyFilter } from '@modules/vacancy'
import { HandySvg } from 'handy-svg'

interface Props {
  vacancyCategories: IVacancyCategoriesData
}

function VacancyFilter({vacancyCategories}: Props) {
  const searchParams = useSearchParams()
  const {isOpen} = useAppSelector(state => state.vacancyFilter)
  const dispatch = useAppDispatch()

  const closeFilter = () => {
    dispatch(closeVacancyFilter())
  }

  return (
    <aside className={clsx(classes.filter, isOpen && classes.open)}>
      <header className={classes.header}>
        <h2 className={classes.title}>Категории</h2>
        <button
          aria-label="Закрыть фильтр"
          onClick={closeFilter}
          className={classes.close}
        >
          <HandySvg
            src="/assets/icons/close.svg"
            width={32}
            height={32}
          />
        </button>
      </header>
      <ul className={classes.list}>
        <li className={classes.item}>
          <Link
            className={clsx(classes.link, !searchParams.get('category_id') && classes.activeLink)}
            href="/vacancies"
            onClick={closeFilter}
          >
            Все категории
            <span className={classes.count}>{vacancyCategories.total_vacancies}</span>
          </Link>
        </li>
        {vacancyCategories.data.map(({id, name, vacancies_count}) => (
          <li
            key={id}
            className={classes.item}
          >
            <Link
              className={clsx(classes.link, Number(searchParams.get('category_id')) === id && classes.activeLink)}
              href={`/vacancies?category_id=${id}`}
              onClick={closeFilter}
            >
              {name}
              <span className={classes.count}>{vacancies_count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export { VacancyFilter }