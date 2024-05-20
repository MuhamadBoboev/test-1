import classes from './checkout-pickup.module.scss'
import { HandySvg } from 'handy-svg'
import { useAppSelector } from '@shared/lib/redux-hooks'
import { normalizePhoneNumber } from '@shared/lib/normalizePhoneNumber'

function CheckoutPickup() {
  const { user } = useAppSelector((state) => state.auth)
  return (
    <div className={classes.checkoutPickup}>
      <div className={classes.top}>
        <HandySvg
          className={classes.icon}
          src="/assets/icons/location.svg"
          width={20}
          height={20}
        />
        <div className={classes.info}>
          <h3 className={classes.title}>Пункт выдачи</h3>
          <p className={classes.address}>г. Душанбе, ул. Карин Манн, 130</p>
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.left}>
          <HandySvg
            className={classes.icon}
            src="/assets/icons/profile.svg"
            width={20}
            height={20}
          />
          <div className={classes.info}>
            <h3 className={classes.title}>Заказчик</h3>
            <p className={classes.address}> {user?.name}</p>
          </div>
        </div>
        <div className={classes.left}>
          <HandySvg
            className={classes.icon}
            src="/assets/icons/call.svg"
            width={20}
            height={20}
          />
          <div className={classes.info}>
            <h3 className={classes.title}>Номер телефона</h3>
            <p className={classes.address}>{normalizePhoneNumber(user?.phone || '')}</p>
          </div>
        </div>
        {/* <p className={classes.name}>
          <HandySvg
            className={classes.icon}
            src="/assets/icons/profile.svg"
            width={20}
            height={20}
          />
         
        </p>
        <p className={classes.phone}>
          <HandySvg
            className={classes.icon}
            src="/assets/icons/call.svg"
            width={20}
            height={20}
          />
          
        </p> */}
      </div>
    </div>
  )
}

export { CheckoutPickup }
