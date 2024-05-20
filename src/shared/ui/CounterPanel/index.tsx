'use client'
import classes from './counter-panel.module.scss'
import { HandySvg } from 'handy-svg'
import { Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'
import toast from 'react-hot-toast'

interface Props {
  className?: string
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>
  maxQuantity: number
  size?: 'large' | 'small'
  unit?: string | null
}

function CounterPanel({className, setQuantity, maxQuantity, quantity, unit, size = 'large'}: Props) {
  return (
    <div className={clsx(classes.panel, size === 'small' && classes.small, className)}>
      <button
        className={classes.decrement}
        onClick={() => {
          if (quantity > 1) {
            setQuantity(prevState => prevState - 1)
          }
        }}
        disabled={quantity < 2}
      >
        <HandySvg
          src="/assets/icons/minus.svg"
          width={24}
          height={24}
        />
      </button>
      <input
        className={classes.input}
        type="number"
        value={quantity}
        onChange={(event) => {
          if (event.target.value !== '') {
            let value = event.target.value.replace(/[^0-9]/g, '')
            value = value.replace(/(\..*)\./g, '$1')
            setQuantity(+value)
          } else {
            // @ts-ignore
            setQuantity('')
          }
        }}
        onBlur={() => {
          if (!quantity || isNaN(+quantity)) {
            setQuantity(1)
          }
          if (quantity > maxQuantity) {
            setQuantity((maxQuantity))
            toast.error(`Доступное кол-во товара ${maxQuantity}${unit || ''}`)
          }
        }}
        min={1}
        max={maxQuantity}
      />
      <button
        className={classes.increment}
        onClick={() => {
          if (quantity < maxQuantity) {
            setQuantity(prevState => prevState + 1)
          }
        }}
        disabled={quantity >= maxQuantity}
      >
        <HandySvg
          src="/assets/icons/plus.svg"
          width={24}
          height={24}
        />
      </button>
    </div>
  )
}

export { CounterPanel }