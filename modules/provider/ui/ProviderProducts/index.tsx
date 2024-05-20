import classes from './provider-products.module.scss'
import { IProductsData } from '@modules/product/model/IProduct'
import { ProductCard } from '@modules/product'
import { Dispatch, SetStateAction } from 'react'
import { Pagination } from '@shared/ui/Pagination'

interface Props {
  products: IProductsData
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

function ProviderProducts({products, page, setPage}: Props) {
  const handleChangePage = ({selected}: { selected: number }) => {
    setPage(selected + 1)
  }

  if (products.data.length === 0) {
    return (
      <p className={classes.emptyTitle}>
        Нет товаров
      </p>
    )
  }

  return (
    <section className={classes.section}>
      <h2 className={classes.title}>Товары поставщика</h2>
      <ul className={classes.list}>
        {products.data.map(product => (
          <li key={product.id} className={classes.item}>
            <ProductCard className={classes.productCard} {...product}/>
          </li>
        ))}
      </ul>
      <Pagination
        forcePage={page - 1}
        pageCount={products.meta.last_page}
        onPageChange={handleChangePage}
      />
    </section>
  )
}

export { ProviderProducts }