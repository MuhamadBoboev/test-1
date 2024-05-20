import classes from './vacancy-card.module.scss'
import { IVacancy } from '@modules/vacancy/model/IVacancy'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'
import { removeTags } from '@shared/lib/removeTags'

function VacancyCard({name, short_description, description, slug}: IVacancy) {
  return (
    <li className={classes.item}>
      <Link className={classes.linkFill} href={`/vacancies/${slug}`}/>
      <article className={classes.card}>
        <h3 className={classes.name}>{name}</h3>
        <p className={classes.description}>
          {removeTags(short_description || description)}
        </p>
        <Link
          className={classes.more}
          href={`/vacancies/${slug}`}
        >
          Перейти
          <HandySvg
            src="/assets/icons/arrow-right-small.svg"
            width={24}
            height={24}
          />
        </Link>
      </article>
    </li>
  )
}

export { VacancyCard }