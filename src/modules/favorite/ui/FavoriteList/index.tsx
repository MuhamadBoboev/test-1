import classes from './favorite-list.module.scss'
import { IProduct } from '@modules/product/model/IProduct'
import { ProductCard } from '@modules/product'

interface Props {
  products: IProduct[]

}

function FavoriteList({products}: Props) {
  return (
    <ul className={classes.list}>
      {products.map(product => (
        <li key={product.id} className={classes.item}>
          <ProductCard className={classes.productCard} {...product}  />
        </li>
      ))}
    </ul>
  )
}

export { FavoriteList }