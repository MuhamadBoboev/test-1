import classes from './vacancy-description.module.scss'
import { Sanitize } from '@shared/ui/Sanitize'

interface Props {
  description: string
}

function VacancyDescription({description}: Props) {
  return (
    <div className={classes.board}>
      <div className={classes.description}>
        <Sanitize text={description}/>
      </div>
    </div>
  )
}

export { VacancyDescription }