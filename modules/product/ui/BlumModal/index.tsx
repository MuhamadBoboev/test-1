import classes from './blum-modal.module.scss'
import { Modal } from '@shared/ui/Modal'
import { Button } from '@shared/ui/Button'
import { useState } from 'react'

interface Props {
  isOpen: boolean
  type: 'buy' | 'cart' | null

  addToCart(): void

  close(): void
}

function BlumModal({isOpen, close, addToCart, type}: Props) {
  const [phoneClicked, setPhoneClicked] = useState(false)
  return (
    <Modal
      isOpen={isOpen}
      close={close}
    >
      <img
        className={classes.logo}
        src="/assets/img/blum.png"
        width={156}
        height={42}
        alt="Blum"
      />
      <h2 className={classes.title}>Получить консультацию</h2>
      <p className={classes.description}>
        Прежде чем покупать продукцию blum получите консультацию от нашего менеджера по совместимости товаров.
      </p>
      <div className={classes.buttons}>
        <Button
          fullWidth
          className={classes.phone}
          theme="primary"
          buttonSize="large"
          tag="a"
          href="#"
          onClick={(event) => {
            if (!phoneClicked) {
              event.preventDefault()
            }
            setPhoneClicked(true)
            const target = event.target as HTMLAnchorElement
            target.href = 'tel:+992487018887'
          }}
        >
          {phoneClicked ? '+992 487 01 88 87' : 'Связаться с менеджером'}
        </Button>
        <Button
          fullWidth
          className={classes.toCart}
          theme="primaryOutline"
          buttonSize="large"
          type="button"
          onClick={() => {
            addToCart()
            close()
          }}
        >
          {type === 'buy' ? 'Купить' : 'Добавить'} без консультации
        </Button>
      </div>
    </Modal>
  )
}

export { BlumModal }