import classes from './providers.module.scss'
import { IProvider } from '@modules/provider'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { IBreadcrumb } from '@shared/interfaces/IBreadcrumb'
import { Wrapper } from '@shared/ui/Wrapper'
import { ProviderList } from '@modules/provider/ui/ProviderList'
import Link from 'next/link'
import { getUrlCategoryProducts } from '@modules/provider/lib/getUrlCategoryProducts'

interface Props {
  title: string
  categorySlug?: string
  subcategorySlug?: string
  breadcrumbs: IBreadcrumb[]
  providers: IProvider[]
}

function Providers({title, breadcrumbs, providers, categorySlug, subcategorySlug}: Props) {
  return (
    <div className={classes.providers}>
      <Wrapper className={classes.wrapper}>
        <Breadcrumbs
          className={classes.breadcrumbs}
          includeHome
          items={breadcrumbs}
        />
        <header className={classes.header}>
          <h1 className={classes.title}>{title}</h1>
          {categorySlug && <div className={classes.tabs}>
            <span className={classes.toCategoryProviders}>
              Поставщики
            </span>
            <Link
              className={classes.toCategoryProducts}
              href={getUrlCategoryProducts(categorySlug, subcategorySlug)}
            >
              Товары
            </Link>
          </div>}
        </header>
        <ProviderList providers={providers}/>
      </Wrapper>
    </div>
  )
}

export { Providers }