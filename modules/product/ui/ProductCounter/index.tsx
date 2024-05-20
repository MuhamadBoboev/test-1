import classes from './product-counter.module.scss'
import { Dispatch, SetStateAction } from 'react'
import { CounterPanel } from '@shared/ui/CounterPanel'

interface Props {
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>
  maxQuantity: number
  unit?: string | null
}

function ProductCounter({quantity, setQuantity, maxQuantity, unit}: Props) {
  return (
    <div className={classes.counter}>
      <p className={classes.name}>Количество {unit ? `(${unit})` : null}</p>
      <CounterPanel
        quantity={quantity}
        setQuantity={setQuantity}
        maxQuantity={maxQuantity}
        unit={unit}
      />
    </div>
  )
}

export { ProductCounter }