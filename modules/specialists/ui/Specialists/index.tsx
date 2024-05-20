'use client'
import classes from './specialists.module.scss'
import { Wrapper } from '@shared/ui/Wrapper'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { useState } from 'react'
import useSWR from 'swr'
import { ISpecialistsData } from '@modules/specialists/model/ISpecialist'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { Loader } from '@shared/ui/Loader'
import { ISpecialistCategory } from '@modules/specialists/model/ISpecialistCategory'
import clsx from 'clsx'
import { SpecialistList } from '../SpecialistList'
import { getSpecialistQuery } from '@modules/specialists/lib/getSpecialistQuery'

interface Props {
  specialistCategories: ISpecialistCategory[]
}

function Specialists({specialistCategories}: Props) {
  const [activeId, setActiveId] = useState(0)
  const [page, setPage] = useState(1)
  const {
    data: specialists,
    isLoading,
    isValidating,
  } = useSWR<ISpecialistsData>(getSpecialistQuery(page, activeId), getFetcher)

  if (!specialists || isLoading || isValidating) {
    return <Loader/>
  }

  return (
    <div className={classes.specialists}>
      <Wrapper className={classes.wrapper}>
        <Breadcrumbs
          className={classes.breadcrumbs}
          includeHome
          items={[{label: 'Специалисты', isActive: true}]}
        />
        <header className={classes.header}>
          <h1 className={classes.title}>Специалисты</h1>
          <ul className={classes.list}>
            <li className={classes.item}>
              <button
                className={clsx(classes.button, activeId === 0 && classes.active)}
                onClick={() => {
                  setActiveId(0)
                  setPage(1)
                }}
              >
                Все
              </button>
            </li>
            {specialistCategories.map(({id, name}) => (
              <li key={id} className={classes.item}>
                <button
                  className={clsx(classes.button, activeId === id && classes.active)}
                  onClick={() => {
                    setActiveId(id)
                    setPage(1)
                  }}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </header>
        <SpecialistList
          specialists={specialists}
          page={page}
          setPage={setPage}
        />
      </Wrapper>
    </div>
  )
}

export { Specialists }