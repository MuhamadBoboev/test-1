import classes from './collection.module.scss'
import { ICollection } from '@modules/product/model/ICollection'
import { ProductCard } from '@modules/product'

interface Props {
  collection: ICollection
}

function Collection({collection}: Props) {
  if (!collection.products.length) {
    return null
  }

  return (
    <article className={classes.collection}>
      <h2 className={classes.name}>{collection.name}</h2>
      <ul className={classes.list}>
        {collection.products.map((product) => (
          <li key={product.id} className={classes.item}>
            <ProductCard {...product}/>
          </li>
        ))}
      </ul>
    </article>
  )
}

export { Collection }