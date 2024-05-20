'use client'
import classes from './filter-accordion-item.module.scss'
import { ReactNode, useState } from 'react'
import { HandySvg } from 'handy-svg'
import clsx from 'clsx'

interface Props {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  disabled?: boolean
}

function FilterAccordionItem({title, children, defaultOpen = false, disabled = false}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={classes.accordion}>
      <div
        className={clsx(
          classes.header,
          (isOpen && !disabled) && classes.active,
          disabled && classes.disable,
        )}
        onClick={toggle}
      >
        <h3 className={classes.title}>{title}</h3>
        <button
          className={classes.toggle}
          onClick={toggle}
        >
          <HandySvg
            src="/assets/icons/arrow-down.svg"
            width={28}
            height={28}
          />
        </button>
      </div>
      {isOpen && !disabled && <div className={classes.content}>
        {children}
      </div>}
    </div>
  )
}

export { FilterAccordionItem }