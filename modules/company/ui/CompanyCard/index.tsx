import classes from './company-card.module.scss'
import { HTMLAttributes } from 'react'
import clsx from 'clsx'

function CompanyCard({children, className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(classes.card, className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { CompanyCard }