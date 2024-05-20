'use client'
import classes from './company-tabs.module.scss'
import { usePathname } from 'next/navigation'
import { companyPages } from '@modules/company/consts/companyPages'
import clsx from 'clsx'
import Link from 'next/link'

function CompanyTabs() {
  const pathname = usePathname()

  return (
    <ul className={classes.list}>
      {companyPages.map(({name, page}) => (
        <li key={name} className={classes.item}>
          <Link
            className={clsx(
              classes.link,
              pathname === page && classes.active
            )}
            href={page}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export { CompanyTabs }