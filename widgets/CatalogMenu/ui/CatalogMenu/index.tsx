'use client'
import classes from './catalog-menu.module.scss'
import { CatalogMenuItem } from '../CatalogMenuItem'
import { useState } from 'react'
import { ICategory } from '@modules/catalog'

export interface Props {
  categories: ICategory[] | null
}

function CatalogMenu({categories}: Props) {
  const [activeItem, setActiveItem] = useState<number | null>(null)

  const toggle = (id: number) => () => {
    setActiveItem(activeItem === id ? null : id)
  }

  if (!categories) {
    return null
  }

  return (
    <div className={classes.catalogMenu}>
      <ul className={classes.list}>
        {categories.map((category) => (
          <CatalogMenuItem
            key={category.id}
            isActive={activeItem === category.id}
            toggle={toggle(category.id)}
            {...category}
          />
        ))}
      </ul>
    </div>
  )
}

export { CatalogMenu }