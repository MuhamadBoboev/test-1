import classes from './provider-mobile.module.scss'
import { IProvider } from '@modules/provider'
import { IProductsData } from '@modules/product/model/IProduct'
import { Wrapper } from '@shared/ui/Wrapper'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import clsx from 'clsx'
import { ProviderInfo } from '@modules/provider/ui/ProviderInfo'
import { ProviderProducts } from '@modules/provider/ui/ProviderProducts'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { log } from 'console'

interface Props {
  provider: IProvider
  products: IProductsData
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

type Tab = 'about' | 'products'

function ProviderMobile({ provider, products, page, setPage }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { name } = provider
  const activeTab = searchParams.get('tab') || 'about'

  const changeTab = (tab: string) => {
    return () => {
      const params = new URLSearchParams(searchParams)
      params.set('tab', tab)
      router.push(`/providers/${provider.slug}?${params.toString()}`)
    }
  }

  return (
    <div className={classes.provider}>
      <Wrapper className={classes.wrapper}>
        <h1 className={classes.name}>{name}</h1>
        <div className={classes.tabs}>
          <button
            className={clsx(
              classes.tab,
              activeTab === 'about' && classes.activeTab
            )}
            onClick={changeTab('about')}
          >
            О компании
          </button>
          <button
            className={clsx(
              classes.tab,
              activeTab === 'products' && classes.activeTab
            )}
            onClick={changeTab('products')}
          >
            Товары
          </button>
        </div>
        <div className={classes.content}>
          {activeTab === 'about' && <ProviderInfo provider={provider} />}
          {activeTab === 'products' && <ProviderProducts
            products={products}
            page={page}
            setPage={setPage}
          />}
        </div>
      </Wrapper>
    </div>
  )
}

export { ProviderMobile }