import classes from './count-chip.module.scss'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLSpanElement>{
  count: number
}

function CountChip({count, className}: Props) {
  if (count === 0) {
    return null
  }
  let countText = count.toString()
  if (countText.length > 2) {
    countText = '+99'
  }

  return (
    <span className={clsx(
      classes.countChip,
      countText.length === 2 && classes.small2,
      countText.length === 3 && classes.small3,
      className,
    )}>
      {countText}
    </span>
  )
}

export { CountChip }