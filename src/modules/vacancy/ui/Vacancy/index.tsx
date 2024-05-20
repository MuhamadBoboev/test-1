import classes from './vacancy.module.scss'
import { IVacancy } from '@modules/vacancy/model/IVacancy'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { Wrapper } from '@shared/ui/Wrapper'
import { VacancyDescription } from '@modules/vacancy/ui/VacancyDescription'
import { VacancyLead } from '@modules/vacancy/ui/VacancyLead'

interface Props {
  vacancy: IVacancy
}

function Vacancy({vacancy}: Props) {
  return (
    <div className={classes.vacancy}>
      <Wrapper>
        <Breadcrumbs
          className={classes.breadcrumbs}
          items={[{label: 'Вакансии', link: '/vacancies'}]}
          includeHome
        />
        <header className={classes.header}>
          <h1 className={classes.title}>{vacancy.name}</h1>
        </header>
        <div className={classes.content}>
          <VacancyDescription description={vacancy.description}/>
          <VacancyLead vacancyId={vacancy.id}/>
        </div>
      </Wrapper>
    </div>
  )
}

export { Vacancy }