import classes from './service-product-counter.module.scss'
import { Dispatch, SetStateAction } from 'react'
import { CounterPanel } from '@shared/ui/CounterPanel'

interface Props {
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>
  maxQuantity: number
}

function ServiceProductCounter({setQuantity, quantity, maxQuantity}: Props) {
  return (
    <div className={classes.counter}>
      <p className={classes.name}>Количество товара</p>
      <CounterPanel
        quantity={quantity}
        setQuantity={setQuantity}
        maxQuantity={maxQuantity}
      />
    </div>
  )
}

export { ServiceProductCounter }