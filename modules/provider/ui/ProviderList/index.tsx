import classes from './provider-list.module.scss'
import { IProvider } from '@modules/provider'
import { ProviderCard } from '@modules/provider/ui/ProviderCard'

interface Props {
  providers: IProvider[]
}

function ProviderList({providers}: Props) {
  return (
    <ul className={classes.list}>
      {providers.map(({id, logo, name, slug}) => (
        <ProviderCard
          key={id}
          logo={logo}
          name={name}
          slug={slug}
        />
      ))}
    </ul>
  )
}

export { ProviderList }