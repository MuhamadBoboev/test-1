import classes from './catalog-section.module.scss'
import { Wrapper } from '@shared/ui/Wrapper'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { ReactNode } from 'react'
import { IBreadcrumb } from '@shared/interfaces/IBreadcrumb'

interface Props {
  children: ReactNode
  title: string
  isSubcategory?: boolean
  breadcrumbs?: IBreadcrumb[]
}

function CatalogSection({children, title, isSubcategory, breadcrumbs}: Props) {
  let items: IBreadcrumb[] = [
    {label: title, isActive: true}
  ]
  if (isSubcategory) {
    items.unshift({
      label: 'Наш каталог',
      link: '/catalog',
    })
  }
  if (breadcrumbs) {
    items = breadcrumbs
  }

  return (
    <section className={classes.section}>
      <Wrapper>
        <Breadcrumbs
          includeHome
          items={items}
        />
        <header className={classes.header}>
          <h1 className={classes.title}>{title}</h1>
        </header>
        {children}
      </Wrapper>
    </section>
  )
}

export { CatalogSection }