import classes from './checkout-online-payment.module.scss'
import { HandySvg } from 'handy-svg'
import { Button } from '@shared/ui/Button'
import { IOrder } from '@modules/order/model/IOrder'
import { useAppSelector } from '@shared/lib/redux-hooks'

interface Props {
  order: IOrder | null
  close(): void
}

function CheckoutOnlinePayment({order, close}: Props) {
  const {user} = useAppSelector(state => state.auth)
  if (!order) {
    return null
  }

  return (
    <div className={classes.onlinePayment}>
      <HandySvg
        className={classes.logo}
        src="/assets/icons/clock.svg"
        width={120}
        height={120}
      />
      <h2 className={classes.title}>В ожидании оплаты</h2>
      <p className={classes.description}>
        Заказ успешно оформлен. Оплатите заказ и наш менеджер в ближайщее время с вами свяжется
      </p>
      <form name="AlifPayForm" action="https://web.alif.tj/" method="post" id="alifPayForm">
        <input type="hidden" name="key" id="key" value={process.env.NEXT_PUBLIC_PAYMENT_KEY}/>
        <input type="hidden" name="token" id="token" value={order.payment_token || ''}/>
        <input type="hidden" name="callbackUrl" id="callbackUrl" value={process.env.NEXT_PUBLIC_PAYMENT_CALLBACK_URL}/>
        <input type="hidden" name="returnUrl" id="returnUrl" value={process.env.NEXT_PUBLIC_PAYMENT_RETURN_URL}/>
        <input type="hidden" name="amount" id="amount" value={order.sub_total}/>
        <input type="hidden" name="orderId" id="orderId" value={order.id}/>
        <input type="hidden" name="gate" id="gate" value="km"/>
        {/*<input type="hidden" name="info" id="info" value=""/>*/}
        <input type="hidden" name="phone" id="phone" value={user?.phone || ''}/>
        <Button
          className={classes.paymentLink}
          fullWidth
          buttonSize="large"
          theme="primary"
          target="_blank"
          href="#"
        >
          Перейти к оплате
        </Button>
      </form>
    </div>
  )
}

export { CheckoutOnlinePayment }