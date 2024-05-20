import classes from './collections.module.scss'
import { ICollection } from '@modules/product/model/ICollection'
import { Button } from '@shared/ui/Button'
import Link from 'next/link'
import { Collection } from '@modules/product/ui/Collection'

interface Props {
  collections: ICollection[]
}

function Collections({collections}: Props) {

  if (!collections.length) {
    return (
      <div className={classes.products}>
        <p className={classes.emptyTitle}></p>
        <Button
          theme="primary"
          buttonSize="large"
          tag={Link}
        >
          Очистить фильтр
        </Button>
      </div>
    )
  }

  return (
    <ul className={classes.list}>
      {collections.map((collection) => (
        <li key={collection.id} className={classes.item}>
          <Collection collection={collection}/>
        </li>
      ))}
    </ul>
  )
}

export { Collections }