'use client'
import classes from './products-filter.module.scss'
import { ParseProductRequestParamsReturnType } from '@modules/product/model/ParseProductRequestParamsReturnType'
import { FilterAccordion } from '@modules/product/ui/FilterAccordion'
import { ICategory } from '@modules/catalog'
import { IProvider } from '@modules/provider'
import { useState } from 'react'
import clsx from 'clsx'
import { useLockedBody } from 'usehooks-ts'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { closeFilter } from '@modules/product'
import { HandySvg } from 'handy-svg'
import { Button } from '@shared/ui/Button'
import { useRouter } from 'next/navigation'
import { getUrlFromFilterObject } from '@modules/product/lib/getUrlFromFilterObject'

interface Props {
  params: ParseProductRequestParamsReturnType
  categories: ICategory[]
  providers: IProvider[]
  viewType: 'products' | 'collections'
}

function ProductsFilter({ params, providers, categories, viewType }: Props) {
  const { isOpen } = useAppSelector(state => state.filter)
  const [selectedCategories, setSelectedCategories] = useState(params.category_id || [])
  const [selectedSubcategories, setSelectedSubcategories] = useState(params.subcategory_id || [])
  const [selectedProviders, setSelectedProviders] = useState(params.provider_id || [])
  const dispatch = useAppDispatch()
  const router = useRouter()

  useLockedBody(isOpen)

  const resetFilter = () => {
    setSelectedCategories([])
    setSelectedSubcategories([])
    setSelectedProviders([])
    dispatch(closeFilter())
  }

  let clearUrl = viewType === 'collections' ? '/products?view=collections' : '/products'

  return (
    <aside className={clsx(classes.filter, isOpen && classes.open)}>
      <div className={classes.header}>
        <h2 className={classes.title}>Фильтр</h2>
        <button
          className={classes.clear}
          onClick={() => {
            resetFilter()
            router.push(clearUrl, { scroll: false })
            router.refresh()
          }}
        >
          Очистить фильтр
        </button>
        <button
          className={classes.close}
          onClick={() => dispatch(closeFilter())}
          aria-label="Закрыть фильтр"
        >
          <HandySvg
            src="/assets/icons/close.svg"
            width={32}
            height={32}
          />
        </button>
      </div>
      <FilterAccordion
        providers={providers}
        categories={categories}
        params={params}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedSubcategories={selectedSubcategories}
        setSelectedSubcategories={setSelectedSubcategories}
        selectedProviders={selectedProviders}
        setSelectedProviders={setSelectedProviders}
        viewType={viewType}
      />
      <Button
        fullWidth
        theme="primary"
        buttonSize="large"
        className={classes.submit}
        onClick={() => {
          const queryString = getUrlFromFilterObject({
            categories: selectedCategories,
            subcategories: selectedSubcategories,
            providers: selectedProviders,
          })
          let url = viewType === 'collections' ? '/products?view=collections&' : '/products?'
          router.push(`${url}${queryString}`, {scroll: false})
          router.refresh()
          dispatch(closeFilter())
        }}
      >
        Применить фильтр
      </Button>
      <Button
        fullWidth
        theme="primaryOutline"
        buttonSize="large"
        className={classes.clearMobile}
        onClick={() => {
          resetFilter()
          router.push(clearUrl, { scroll: false })
          router.refresh()
        }}
      >
        Очистить фильтр
      </Button>
    </aside>
  )
}

export { ProductsFilter }
