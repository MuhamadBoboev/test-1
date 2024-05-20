'use client'
import classes from './provider.module.scss'
import { IProvider } from '@modules/provider'
import { IProductsData } from '@modules/product/model/IProduct'
import { ProviderInfo } from '@modules/provider/ui/ProviderInfo'
import { Wrapper } from '@shared/ui/Wrapper'
import { useWindowSize } from 'usehooks-ts'
import { ProviderMobile } from '@modules/provider/ui/ProviderMobile'
import { ProviderProducts } from '@modules/provider/ui/ProviderProducts'
import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { useState } from 'react'
import { Loader } from '@shared/ui/Loader'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'

interface Props {
  provider: IProvider
}

function Provider({provider}: Props) {
  const [page, setPage] = useState(1)
  const {
    data: products,
    isLoading,
    isValidating
  } = useSWR<IProductsData>(`/products?page=${page}&provider_id[]=${provider.id}&per_page=12`, getFetcher, {
    revalidateOnFocus: false,
  })
  const {width} = useWindowSize()

  if (isLoading || isValidating || !products) {
    return <Loader/>
  }

  if (width <= 768) {
    return (
      <ProviderMobile
        provider={provider}
        products={products}
        page={page}
        setPage={setPage}
      />
    )
  }

  return (
    <Wrapper className={classes.wrapper}>
      <Breadcrumbs
        className={classes.breadcrumbs}
        includeHome
        items={[
          {label: 'Все поставщики', link: '/providers'},
          {label: provider.name, isActive: true},
        ]}
      />
      <ProviderInfo provider={provider}/>
      <ProviderProducts
        products={products}
        page={page}
        setPage={setPage}
      />
    </Wrapper>
  )
}

export { Provider }