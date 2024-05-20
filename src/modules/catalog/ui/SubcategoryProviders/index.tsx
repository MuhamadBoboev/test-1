import classes from './subcategory-providers.module.scss'
import { CatalogSection } from '@modules/catalog/ui/CatalogSection'
import { ProviderCard } from '@modules/provider/ui/ProviderCard'
import { ISubcategoryProviders } from '@modules/catalog/model/ISubcategoryProviders'

interface Props {
  subcategoryProviders: ISubcategoryProviders
}

function SubcategoryProviders({subcategoryProviders}: Props) {
  const {
    id: subcategoryId,
    category,
    name,
    providers,
    slug,
  } = subcategoryProviders

  return (
    <CatalogSection
      title={name}
      breadcrumbs={[
        {label: category.name, link: `/catalog/${category.slug}/providers`},
        {label: name, isActive: true},
      ]}
    >
      <ul className={classes.list}>
        {providers.map(({id, logo, name, slug}) => (
          <ProviderCard
            key={id}
            logo={logo}
            name={name}
            slug={slug}
            customLink={`/products?categories=${category.id}&subcategories=${subcategoryId}&providers=${id}`}
          />
        ))}
      </ul>
    </CatalogSection>
  )
}

export { SubcategoryProviders }