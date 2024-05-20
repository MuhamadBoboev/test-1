'use client'
import classes from './products.module.scss'
import { ProductsSection } from '@modules/product/ui/ProductsSection'
import { ProductsRequestInfoType } from '@modules/product/model/ProductsRequestInfo'
import { ProductsFilter } from '@modules/product/ui/ProductsFilter'
import { ICategory } from '@modules/catalog'
import { IProvider } from '@modules/provider'
import { IProductsData } from '@modules/product/model/IProduct'
import { ProductList } from '@modules/product/ui/ProductList'
import { SearchParamsType } from '@shared/interfaces/SearchParamsType'
import { parseProductsRequestParams } from '@modules/product/lib/parseProductsRequestParams'
import { objectToBackendUrlString } from '@shared/lib/objectToBackendUrlString'
import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { Loader } from '@shared/ui/Loader'
import { notFound } from 'next/navigation'
import { ICollectionData } from '@modules/product/model/ICollection'

interface Props {
  searchParams: SearchParamsType
}

function Products({searchParams}: Props) {
  const params = parseProductsRequestParams(searchParams)
  let viewType: 'collections' | 'products' = searchParams.view === 'collections' ? 'collections' : 'products'
  const productsUrl = `/${viewType}?` + objectToBackendUrlString(params as SearchParamsType) + '&per_page=12&filter_quantity=1&filter_active=1'
  const {data: products} = useSWR<IProductsData | ICollectionData>(productsUrl, getFetcher)
  const requestInfoUrl = `/products/info-request?` + objectToBackendUrlString(params as SearchParamsType)
  const {data: requestInfo} = useSWR<ProductsRequestInfoType>(requestInfoUrl, getFetcher)
  const {data: categories} = useSWR<{ data: ICategory[] }>('/categories', getFetcher)
  const {data: providers} = useSWR<{ data: IProvider[] }>('/providers', getFetcher)

  if (!products || !requestInfo || !categories || !providers) {
    return <Loader/>
  }

  if (
    searchParams.page &&
    !isNaN(+searchParams.page) &&
    +searchParams.page > products.meta.last_page
  ) {
    notFound()
  }

  return (
    <ProductsSection
      viewType={viewType}
      title={requestInfo.title}
      searchParams={searchParams}
    >
      <div className={classes.block}>
        <ProductsFilter
          viewType={viewType}
          params={params}
          categories={categories?.data || []}
          providers={providers?.data || []}
        />
        <ProductList
          data={products}
          searchParams={searchParams}
          viewType={viewType}
        />
      </div>
    </ProductsSection>
  )
}

export { Products }