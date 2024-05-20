import classes from './catalog-menu-sub-item.module.scss'
import { animated, useTransition } from '@react-spring/web'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'
import { ISubcategory } from '@modules/catalog'
import { useRef } from 'react'

interface Props {
  categoryId: number
  categorySlug: string
  subcategories: ISubcategory[]
  isActive: boolean
}

function CatalogMenuSubItem({categorySlug, isActive, subcategories}: Props) {
  const transitions = useTransition(isActive, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
    config: {duration: 150},
  })

  return transitions((styles, isOpen) => isOpen && (
    <animated.ul
      className={classes.subList}
      style={styles}
    >
      {subcategories.map(({id, name, slug}) => (
        <li
          key={id}
          className={classes.subItem}
        >
          <Link
            href={`/catalog/${categorySlug}/${slug}/providers`}
            className={classes.subLink}
          >
            {name}
            <HandySvg
              src="/assets/icons/arrow-right.svg"
              width={16}
              height={16}
            />
          </Link>
        </li>
      ))}
    </animated.ul>
  ))
}

export { CatalogMenuSubItem }