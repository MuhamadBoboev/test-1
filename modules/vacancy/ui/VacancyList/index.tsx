import classes from './vacancy-list.module.scss'
import { IVacancy } from '@modules/vacancy/model/IVacancy'
import { VacancyCard } from '@modules/vacancy/ui/VacancyCard'

interface Props {
  vacancies: IVacancy[]
}

function VacancyList({vacancies}: Props) {

  if (!vacancies.length) {
    return (
      <p className={classes.emptyTitle}>На данный момент нет актуальных вакансий</p>
    )
  }

  return (
    <ul className={classes.list}>
      {vacancies.map(vacancy => (
        <VacancyCard
          key={vacancy.id}
          {...vacancy}
        />
      ))}
    </ul>
  )
}

export { VacancyList }