import classes from './specialist-list.module.scss'
import { Dispatch, SetStateAction } from 'react'
import { ISpecialistsData } from '@modules/specialists/model/ISpecialist'
import { SpecialistCard } from '../SpecialistCard'
import { Pagination } from '@shared/ui/Pagination'

interface Props {
  specialists: ISpecialistsData
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

function SpecialistList({specialists, page, setPage}: Props) {

  const handleChangePage = ({selected}: { selected: number }) => {
    setPage(selected + 1)
  }

  return (
    <div>
      <ul className={classes.list}>
        {specialists.data.map(specialist => (
          <li key={specialist.id}>
            <SpecialistCard {...specialist}/>
          </li>
        ))}
      </ul>
      <Pagination
        forcePage={page - 1}
        pageCount={specialists.meta.last_page}
        onPageChange={handleChangePage}
      />
    </div>
  )
}

export { SpecialistList }