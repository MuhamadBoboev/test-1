import classes from './checkout-cash-modal.module.scss'
import { Modal } from '@shared/ui/Modal'
import { CheckoutSuccess } from '@modules/checkout/ui/CheckoutSuccess'
import Image from 'next/image'

interface Props {
  isOpen: boolean

  close(): void
}

function CheckoutCashModal({isOpen, close}: Props) {
  return (
    <Modal
      close={close}
      isOpen={isOpen}
    >
      <div className={classes.block}>
        <CheckoutSuccess close={close}/>
      </div>
    </Modal>
  )
}

export { CheckoutCashModal }