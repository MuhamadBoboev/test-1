import classes from './catalog-card.module.scss'
import clsx from 'clsx'
import Link from 'next/link'

interface Props {
  className?: string
  id: number
  icon: string
  name: string
  link: string
}

function CatalogCard({className, icon, name, link}: Props) {
  return (
    <li className={clsx(classes.card, className)}>
      <Link
        className={classes.link}
        href={link}
      >
        <img
          className={classes.icon}
          src={icon}
          width={96}
          height={96}
        />
        <h3 className={classes.name}>{name}</h3>
      </Link>
    </li>
  )
}

export { CatalogCard }