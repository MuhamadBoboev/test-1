'use client'
import classes from './socials.module.scss'
import { socials } from '@modules/company/consts/socials'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'

function Socials() {
  return (
    <ul className={classes.list}>
      {socials.map(({name, link, icon}) => (
        <li
          key={name}
          className={classes.item}
        >
          <Link
            href={link}
            className={classes.link}
            target="_blank"
            aria-label={name}
          >
            <HandySvg
              src={`/assets/icons/socials/${icon}`}
              width={32}
              height={32}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export { Socials }