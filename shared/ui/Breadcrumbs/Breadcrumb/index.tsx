'use client'
import classes from './breadcrumb.module.scss'
import { IBreadcrumb } from '@shared/interfaces/IBreadcrumb'
import Link from 'next/link'
import clsx from 'clsx'
import { HandySvg } from 'handy-svg'
import { ReactNode } from 'react'

interface Props extends IBreadcrumb {
  className?: string
}

function Breadcrumb({className, link, icon, label, isActive}: Props) {


  const Container = ({children}: { children: ReactNode }) => {
    if (link) {
      return (
        <Link
          href={link}
          className={classes.link}
        >
          {children}
        </Link>
      )
    }

    return (
      <span className={classes.link}>
        {children}
      </span>
    )
  }

  return (
    <li
      className={clsx(
        classes.item,
        className,
        isActive && classes.active
      )}
    >
      <Container>
        {icon && (
          <HandySvg
            src={icon}
            width={20}
            height={20}
          />
        )}
        <span className={classes.label}>{label}</span>
      </Container>
      <HandySvg
        className={classes.chevron}
        src="/assets/icons/chevron-breadcrumb.svg"
        width={20}
        height={20}
      />
    </li>
  )
}

export { Breadcrumb }