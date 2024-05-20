import classes from './payment-methods.module.scss'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import clsx from 'clsx'
import { HandySvg } from 'handy-svg'
import { selectPaymentMethod } from '@modules/checkout'
import { Link } from 'react-scroll';
import { Button } from '@/shared/ui/Button'

function PaymentMethods() {
  const {data, paymentMethodId} = useAppSelector(state => state.checkout)
  const dispatch = useAppDispatch()

  if (!data.paymentMethods || !data.paymentMethods.length) {
    return null
  }
 
  return (
    <section className={classes.paymentMethods}>
      <h2 className={classes.title}>Способы оплаты</h2>
      <ul className={classes.list}>
        {data.paymentMethods.filter(({is_active}) => is_active).map(({id, name, key, is_active}) => (
          <li key={id} className={classes.item}>
            <button
              className={clsx(
                classes.button,
                paymentMethodId === id && classes.active
              )}
              disabled={!is_active}
              onClick={() => {
                dispatch(selectPaymentMethod(id))
              }}
            >
              <HandySvg
                className={classes.icon}
                src={`/assets/icons/${key || 'cash-payment'}.svg`}
                width={20}
                height={20}
              />
              <span className={classes.name}>{name}</span>
            </button>
          </li>
        ))}
      </ul>
      <Link
              activeClass="active"           
              spy={true}
              smooth={true}
              duration={800}
              to='delivery1'
              offset={450}             
            >
              <Button className={classes.btn}>
               Далее
                
              </Button>
            </Link>         
    </section>
  )
}

export { PaymentMethods }