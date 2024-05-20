import classes from './catalog-menu-item.module.scss'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'
import clsx from 'clsx'
import { CatalogMenuSubItem } from '@widgets/CatalogMenu/ui/CatalogMenuSubItem'
import { MouseEventHandler } from 'react'
import { ICategory } from '@modules/catalog'

interface CatalogMenuItemProps extends ICategory {
  isActive: boolean

  toggle(id: number): void
}

function CatalogMenuItem({id, name, subcategories, slug, toggle, isActive}: CatalogMenuItemProps) {

  const onClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (subcategories.length !== 0) {
      event.preventDefault()
      event.stopPropagation()
      toggle(id)
    }
  }

  return (
    <li className={classes.item}>
      <Link
        href={`/catalog/${slug}/providers`}
        className={clsx(classes.link, isActive && classes.activeItem)}
        onClick={onClick}
      >
        {name}
        <HandySvg
          src="/assets/icons/arrow-right.svg"
          width={20}
          height={20}
        />
      </Link>
      {subcategories.length !== 0 && (
        <CatalogMenuSubItem
          categoryId={id}
          categorySlug={slug}
          subcategories={subcategories}
          isActive={isActive}
        />
      )}
    </li>
  )
}

export { CatalogMenuItem }