'use client'
import classes from './checkout.module.scss'
import { CheckoutSection } from '@modules/checkout/ui/CheckoutSection'
import { PaymentMethods } from '@modules/checkout/ui/PaymentMethods'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { useEffect } from 'react'
import {
  getPaymentMethods,
  getShippingLocations,
  getShippingTypes,
} from '@modules/checkout'
import { useRouter } from 'next/navigation'
import Loading from '@app/products/loading'
import { CheckoutDelivery } from '@modules/checkout/ui/CheckoutDelivery'
import { CheckoutOrder } from '@modules/checkout/ui/CheckoutOrder'
import { CheckoutProducts } from '@modules/checkout/ui/CheckoutProducts'
import { SelectedServices } from '@modules/service'
import { CheckoutOrder2 } from '../ChekoutOrder2'

function Checkout() {
  const dispatch = useAppDispatch()
  const { statuses } = useAppSelector((state) => state.checkout)
  const { products } = useAppSelector((state) => state.cart)
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      await dispatch(getPaymentMethods())
      await dispatch(getShippingLocations())
      await dispatch(getShippingTypes())
      if (
        statuses.paymentMethodsStatus === 'rejected' ||
        statuses.shippingLocationsStatus === 'rejected' ||
        statuses.shippingTypesStatus === 'rejected'
      ) {
        throw new Error()
      }
    })()
  }, [
    statuses.paymentMethodsStatus,
    statuses.shippingLocationsStatus,
    statuses.shippingTypesStatus,
  ])
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      router.push('/')
    }
  }, [user])

  useEffect(() => {
    if (!products.length) {
      router.push('/')
    }
  }, [])

  if (!user) {
    return <Loading />
  }

  return (
    <CheckoutSection>
      <div className={classes.block}>
        <div className={classes.left}>
          {/* <PaymentMethods /> */}
          <CheckoutProducts />
          <SelectedServices isAllowRemove={false} />
        </div>
        <div className={classes.right}>
          {/* <CheckoutOrder /> */}
          <CheckoutOrder2 />
          {/* <CheckoutDelivery /> */}
        </div>
      </div>
      <div className={classes.mobile}>
        <PaymentMethods />
        <CheckoutDelivery />
        <CheckoutProducts />
        <SelectedServices isAllowRemove={false} />
        <CheckoutOrder />
      </div>
    </CheckoutSection>
  )
}

export { Checkout }
