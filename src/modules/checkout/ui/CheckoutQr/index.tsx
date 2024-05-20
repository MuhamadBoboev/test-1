import classes from './checkout-qr.module.scss'
import Image from 'next/image'
import { Button } from '@shared/ui/Button'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { storeOrder } from '@modules/checkout/api/storeOrder'
import { useState } from 'react'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import { CheckoutSuccess } from '@modules/checkout/ui/CheckoutSuccess'
import toast from 'react-hot-toast'
import { clearCart } from '@modules/cart/lib/clearCart'

interface Props {
  close(): void
}

function CheckoutQr({close}: Props) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'pending' | 'fulfilled' | 'rejected'>('idle')
  const {token} = useAppSelector(state => state.auth)
  const {products} = useAppSelector(state => state.cart)
  const {
    paymentMethodId,
    clientAddress,
    shippingLocationId,
    shippingTypeId,
    deliveryMethod,
    data,
  } = useAppSelector(state => state.checkout)
  const dispatch = useAppDispatch()

  const submitContent = {
    idle: 'Оформить заказ',
    pending: (
      <BarLoader
        color="#fff"
        width={20}
        height={20}
        size={3}
      />
    ),
    fulfilled: 'Оформить заказ',
    rejected: 'Оформить заказ',
  }

  const onSubmit = async () => {
    setSubmitStatus('pending')
    const response = await storeOrder({
      shipping_location_id: shippingLocationId,
      payment_method_id: paymentMethodId!,
      token: token!,
      cartProducts: products,
      shipping_address: clientAddress,
      shipping_type_id: shippingTypeId,
      deliveryMethod,
      comment: data.comment,
    })
    setSubmitStatus(response.success ? 'fulfilled' : 'rejected')
    if (!response.success) {
      toast.error('Произошла ошибка')
    }
    dispatch(clearCart())
  }

  const isShowMainView = !((submitStatus === 'fulfilled'))

  return (
    <>
      <Image
        className={classes.logo}
        src="/assets/img/logo.svg"
        alt="PRO MEBEL"
        width={190}
        height={62}
      />
      {submitStatus === 'fulfilled' && <CheckoutSuccess close={close}/>}
      {isShowMainView && <>
        <h2 className={classes.title}>Оплата по QR</h2>
        <img
          className={classes.qr}
          src="/assets/img/qr.jpg"
          alt="QR"
          width={282}
          height={277}
        />
        <img
          className={classes.qrBanks}
          src="/assets/img/logo-bank.svg"
          alt="Banks"
          width={286}
          height={78}
        />
        <a
          className={classes.download}
          target="_blank"
          href="/assets/img/qr.jpg"
          download
        >
          Скачать QR
        </a>
        <Button
          className={classes.submit}
          fullWidth
          buttonSize="large"
          theme="primary"
          onClick={onSubmit}
          disabled={submitStatus === 'pending'}
        >
          {submitContent[submitStatus]}
        </Button>
      </>}
    </>
  )
}

export { CheckoutQr }