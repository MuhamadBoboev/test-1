import classes from './checkout-order-modal.module.scss'
import { Modal } from '@shared/ui/Modal'
import { CheckoutQr } from '@modules/checkout/ui/CheckoutQr'
import { CheckoutSuccess } from '@modules/checkout/ui/CheckoutSuccess'
import { CheckoutOnlinePayment } from '@modules/checkout/ui/CheckoutOnlinePayment'
import { IOrder } from '@modules/order/model/IOrder'

interface Props {
  isOpen: boolean
  order: IOrder | null
  type: null | 'cash-payment' | 'card-payment' | 'qr'
  close(): void
}

function CheckoutOrderModal({isOpen, order, type, close}: Props) {

  const content = {
    ['cash-payment']: <CheckoutSuccess close={close}/>,
    ['card-payment']: <CheckoutOnlinePayment order={order} close={close}/>,
    qr: <CheckoutQr close={close}/>,
    default: null,
  }

  return (
    <Modal
      isOpen={isOpen}
      close={close}
    >
      <div className={classes.block}>
        {content[type || 'default']}
      </div>
    </Modal>
  )
}

export { CheckoutOrderModal }