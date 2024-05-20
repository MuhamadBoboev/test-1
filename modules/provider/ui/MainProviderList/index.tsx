'use client'
import classes from './main-provider-list.module.scss'
import { MainProviderCard } from '@modules/provider/ui/MainProviderCard'
import { IProvider } from '@modules/provider'
import { useWindowSize } from 'usehooks-ts'
import { MainProviderCarousel } from '@modules/provider/ui/MainProviderCarousel'

interface Props {
  providers: IProvider[]
}

function MainProviderList({providers}: Props) {
  const {width} = useWindowSize()

  if (width <= 768) {
    return (
      <MainProviderCarousel providers={providers}/>
    )
  }
  return (
    <ul className={classes.list}>
      {providers.map(({id, name, logo, slug}) => (
        <MainProviderCard
          key={id}
          logo={logo}
          name={name}
          slug={slug}
        />
      ))}
    </ul>
  )
}

export { MainProviderList }