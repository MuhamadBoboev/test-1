'use client'
import classes from './projects.module.scss'
import { Wrapper } from '@shared/ui/Wrapper'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { ProjectList } from '@modules/project/ui/ProjectList'
import { Pagination } from '@shared/ui/Pagination'
import useSWR from 'swr'
import { IProjectData } from '@modules/project/model/IProject'
import { useState } from 'react'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { Loader } from '@shared/ui/Loader'

function Projects() {
  const [page, setPage] = useState(1)
  const {
    data: projects,
    isValidating,
    isLoading,
    error,
  } = useSWR<IProjectData>(`/projects?per_page=12&page=${page}`, getFetcher)

  const handleChangePage = ({selected}: {selected: number}) => {
    setPage(selected + 1)
  }

  if (error) {
    throw new Error()
  }

  if (isLoading || isValidating || !projects) {
    return <Loader/>
  }

  return (
    <section className={classes.projects}>
      <Wrapper className={classes.wrapper}>
        <Breadcrumbs
          className={classes.breadcrumbs}
          includeHome
          items={[{label: 'Проекты', link: '/projects'}]}
        />
        <header className={classes.header}>
          <h1 className={classes.title}>Готовые проекты</h1>
        </header>
        <ProjectList projects={projects.data}/>
        <Pagination
          forcePage={page - 1}
          pageCount={projects.meta.last_page}
          onPageChange={handleChangePage}
        />
      </Wrapper>
    </section>
  )
}

export { Projects }