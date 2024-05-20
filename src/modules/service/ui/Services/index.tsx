'use client'
import classes from './services.module.scss'
import { Wrapper } from '@shared/ui/Wrapper'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { useState } from 'react'
import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { Loader } from '@shared/ui/Loader'
import { Pagination } from '@shared/ui/Pagination'
import { ServiceList } from '@modules/service/ui/ServiceList'
import { IServiceData } from '@modules/service/model/IService'

function Services() {
  const [page, setPage] = useState(1)
  const {
    data: services,
    isValidating,
    isLoading,
    error,
  } = useSWR<IServiceData>(`/services?per_page=12&page=${page}`, getFetcher, {
    revalidateOnFocus: false
  })

  const handleChangePage = ({selected}: { selected: number }) => {
    setPage(selected + 1)
  }

  if (error) {
    throw new Error()
  }

  if (isLoading || isValidating || !services) {
    return <Loader/>
  }

  return (
    <section className={classes.services}>
      <Wrapper className={classes.wrapper}>
        <Breadcrumbs
          className={classes.breadcrumbs}
          includeHome
          items={[{label: 'Наши услуги', isActive: true}]}
        />
        <header className={classes.header}>
          <h1 className={classes.title}>Наши услуги</h1>
        </header>
        <ServiceList services={services.data || []}/>
        <Pagination
          forcePage={page - 1}
          pageCount={services.meta.last_page}
          onPageChange={handleChangePage}
        />
      </Wrapper>
    </section>
  )
}

export { Services }