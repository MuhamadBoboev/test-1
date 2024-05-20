import classes from './category-providers.module.scss'
import { ICategoryProviders } from '@modules/catalog/model/ICategoryProviders'
import { CatalogSection } from '@modules/catalog/ui/CatalogSection'
import { ProviderCard } from '@modules/provider/ui/ProviderCard'

interface Props {
  categoryProviders: ICategoryProviders
}

function CategoryProviders({categoryProviders}: Props) {
  const {
    id: categoryId,
    name,
    providers,
  } = categoryProviders

  return (
    <CatalogSection
      title={name}
    >
      <ul className={classes.list}>
        {providers.map(({id, logo, name, slug}) => (
          <ProviderCard
            key={id}
            logo={logo}
            name={name}
            slug={slug}
            customLink={`/products?categories=${categoryId}&providers=${id}`}
          />
        ))}
      </ul>
    </CatalogSection>
  )
}

export { CategoryProviders }