'use client'
import classes from './products-section.module.scss'
import { Wrapper } from '@shared/ui/Wrapper'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { IBreadcrumb } from '@shared/interfaces/IBreadcrumb'
import { ReactNode } from 'react'
import { HandySvg } from 'handy-svg'
import { useAppDispatch } from '@shared/lib/redux-hooks'
import { openFilter } from '@modules/product'
import clsx from 'clsx'
import { SearchParamsType } from '@shared/interfaces/SearchParamsType'
import { useRouter } from 'next/navigation'

interface Props {
  title: string
  children: ReactNode
  viewType: 'products' | 'collections'
  searchParams: SearchParamsType
}

function ProductsSection({ title, children, viewType, searchParams }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  let customTitle = title
  if (title === 'Все товары' && viewType === 'collections') {
    customTitle = 'Все коллекции'
  }
  const items: IBreadcrumb[] = [
    { label: customTitle, isActive: true }
  ]

  const handleChangeView = (view: 'products' | 'collections') => () => {
    const params: any = {
      ...searchParams,
      view,
    }
    const query = Object.keys(params).map(key => {
      return `${key}=${params[key].toString()}`
    }).join('&')
    router.push(`/products?${query}`)
  }

  return (
    <section className={classes.section}>
      <Wrapper>
        <Breadcrumbs
          className={classes.breadcrumbs}
          includeHome
          items={items}
        />
        <header className={classes.header}>
          <h1 className={classes.title}>{customTitle}</h1>
          <div className={classes.variantShow}>
            <button
              className={clsx(classes.viewButton, viewType === 'products' && classes.viewActive)}
              onClick={handleChangeView('products')}
            >
              Товары
            </button>
            <button
              className={clsx(classes.viewButton, viewType === 'collections' && classes.viewActive)}
              onClick={handleChangeView('collections')}
            >
              Коллекции
            </button>
          </div>
          <button
            className={classes.filter}
            aria-label="Фильтры"
            onClick={() => dispatch(openFilter())}
          >
            Фильтры
          </button>
        </header>
        <div className={classes.variantShowMobile}>
          <button
            className={clsx(classes.viewButton, viewType === 'products' && classes.viewActive)}
            onClick={handleChangeView('products')}
          >
            Товары
          </button>
          <button
            className={clsx(classes.viewButton, viewType === 'collections' && classes.viewActive)}
            onClick={handleChangeView('collections')}
          >
            Коллекции
          </button>
        </div>
        {children}
      </Wrapper>
    </section>
  )
}

export { ProductsSection }