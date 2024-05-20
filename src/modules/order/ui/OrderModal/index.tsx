import classes from './order-modal.module.scss'
import { Modal } from '@shared/ui/Modal'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { closeOrder } from '@modules/order/model/orderSlice'
import { OrderProductCard } from '@modules/order/ui/OrderProductCard'
import { Button } from '@shared/ui/Button'
import { OrderServices } from '@modules/order/ui/OrderServices'
import { useEffect, useState } from 'react'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import { updatePaymentStatus } from '@modules/order/api/updatePaymentStatus'
import toast from 'react-hot-toast'
import { IOnlinePayment } from '@modules/order/model/IOnlinePayment'
import { KeyedMutator } from 'swr'
import clsx from 'clsx'
import { axiosInstance } from '@shared/api/axiosInstance'
import { IOrder } from '@modules/order/model/IOrder'
import { AxiosResponse } from 'axios'

interface Props {
  mutate: KeyedMutator<any>
}

function OrderModal({mutate}: Props) {
  const {isOpen, activeOrder} = useAppSelector(state => state.order)
  const {token, user} = useAppSelector(state => state.auth)
  const [updatedPaymentStatus, setUpdatedPaymentStatus] = useState<IOnlinePayment | null>(null)
  const [isCheckingPayment, setIsCheckingPayment] = useState(activeOrder?.online_payment?.status !== 'ok')
  const [isLoadingRestore, setIsLoadingRestore] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (activeOrder?.online_payment?.status !== 'ok' && isOpen) {
      setIsCheckingPayment(true)
      updatePaymentStatus(activeOrder?.id || 0, token!)
        .then(response => {
          setUpdatedPaymentStatus(response.data)
          setIsCheckingPayment(false)
        })
    }
  }, [activeOrder, isOpen])

  const close = () => {
    dispatch(closeOrder())
  }

  let paymentStatus = 'Не оплачен'
  if (activeOrder?.online_payment?.status === 'ok' || updatedPaymentStatus?.status === 'ok') {
    paymentStatus = 'Успешно оплачено'
  }

  let showCheckPayment = false
  if (activeOrder?.payment_method?.key === 'card-payment') {
    if (activeOrder.online_payment) {
      showCheckPayment = activeOrder.online_payment.status !== 'ok'
    } else {
      showCheckPayment = true
    }
  }
  if (updatedPaymentStatus) {
    showCheckPayment = updatedPaymentStatus.status !== 'ok'
  }

  let showGoToPay = false
  if (activeOrder?.payment_method?.key === 'card-payment') {
    if (activeOrder.online_payment) {
      showGoToPay = activeOrder.online_payment.status !== 'ok'
    } else {
      showGoToPay = true
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      close={close}
    >
      {activeOrder && <div className={classes.block}>
        <h2 className={classes.title}>Заказ №{activeOrder?.id}</h2>
        <h3 className={classes.subtitle}>Товары</h3>
        <ul className={classes.productList}>
          {activeOrder.items.map(item => (
            <li key={item.id} className={classes.productItem}>
              <OrderProductCard {...item}/>
            </li>
          ))}
        </ul>
        <OrderServices
          services={activeOrder.services || []}
        />
        <dl className={classes.infoList}>
          {!!activeOrder.status && <div className={classes.item}>
            <dt className={classes.name}>Статус</dt>
            <dd className={classes.value}>{activeOrder.status.name}</dd>
          </div>}
          {activeOrder.payment_method?.key === 'card-payment' && <div className={classes.item}>
            <dt className={classes.name}>Статус оплаты</dt>
            <dd className={clsx(classes.value, isCheckingPayment && classes.isCheckingStatus)}>{paymentStatus}</dd>
          </div>}
          {activeOrder.payment_method && <div className={classes.item}>
            <dt className={classes.name}>Метод оплаты</dt>
            <dd className={classes.value}>{activeOrder.payment_method.name}</dd>
          </div>}
          {activeOrder.shipping_address && <div className={classes.item}>
            <dt className={classes.name}>Адрес доставки</dt>
            <dd className={classes.value}>{activeOrder.shipping_address}</dd>
          </div>}
          {activeOrder.shipping_type && <div className={classes.item}>
            <dt className={classes.name}>Тип доставки</dt>
            <dd className={classes.value}>{activeOrder.shipping_type.name}</dd>
          </div>}
          {!!activeOrder.discount && <div className={classes.item}>
            <dt className={classes.name}>Скидка</dt>
            <dd className={classes.value}>{activeOrder.discount}%</dd>
          </div>}
          {activeOrder.total !== activeOrder.sub_total && <div className={classes.item}>
            <dt className={classes.name}>Сумма без скидки</dt>
            <dd className={classes.value}>{activeOrder.total} с.</dd>
          </div>}
          <div className={classes.item}>
            <dt className={classes.name}>Итого</dt>
            <dd className={classes.value}>{activeOrder.sub_total} с.</dd>
          </div>
          <div className={classes.item}>
            <dt className={classes.name}>Дата</dt>
            <dd className={classes.value}>{new Date(activeOrder.created_at).toLocaleDateString('ru-RU')}</dd>
          </div>
        </dl>
        {showGoToPay && <form
          name="AlifPayForm"
          action="https://web.alif.tj/"
          method="post"
          id="alifPayForm"
          onSubmit={async (event) => {
            event.preventDefault()
            setIsLoadingRestore(true)
            try {
              const orderData: AxiosResponse<{
                data: IOrder
              }> = await axiosInstance.post(`/orders/restore/${activeOrder.id}`, {}, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                }
              })
              const newOrder = orderData.data.data
              const target = event.target as HTMLFormElement
              target.token.value = newOrder.payment_token || ''
              target.amount.value = newOrder.sub_total
              target.orderId.value = newOrder.id
              target.submit()
            } catch (e) {
              console.log(e)
              setIsLoadingRestore(false)
              toast.error('Произошла ошибка')
            }
          }}
        >
          <input type="hidden" name="key" id="key" value={process.env.NEXT_PUBLIC_PAYMENT_KEY}/>
          <input type="hidden" name="token" id="token" value={activeOrder.payment_token || ''}/>
          <input type="hidden" name="callbackUrl" id="callbackUrl"
                 value={process.env.NEXT_PUBLIC_PAYMENT_CALLBACK_URL}/>
          <input type="hidden" name="returnUrl" id="returnUrl" value={process.env.NEXT_PUBLIC_PAYMENT_RETURN_URL}/>
          <input type="hidden" name="amount" id="amount" value={activeOrder.sub_total}/>
          <input type="hidden" name="orderId" id="orderId" value={activeOrder.id}/>
          <input type="hidden" name="gate" id="gate" value="km"/>
          {/*<input type="hidden" name="info" id="info" value=""/>*/}
          <input type="hidden" name="phone" id="phone" value={user?.phone || ''}/>
          <Button
            className={classes.paymentLink}
            fullWidth
            buttonSize="large"
            theme="primary"
            target="_blank"
            disabled={isLoadingRestore}
            href="#"
          >
            {!isLoadingRestore && 'Перейти к оплате'}
            {isLoadingRestore && (
              <BarLoader
                width={24}
                height={24}
                size={2}
                color="#fff"
              />
            )}
          </Button>
        </form>}
        {showCheckPayment && (
          <Button
            className={classes.checkPayment}
            fullWidth
            buttonSize="large"
            theme="primary"
            disabled={isCheckingPayment}
            onClick={async () => {
              setIsCheckingPayment(true)
              const response = await updatePaymentStatus(activeOrder.id, token!)
              toast[response.success ? 'success' : 'error'](response.message)
              setUpdatedPaymentStatus(response.data)
              setIsCheckingPayment(false)
              await mutate()
            }}
          >
            {!isCheckingPayment && 'Проверить статус оплаты'}
            {isCheckingPayment && (
              <BarLoader
                width={24}
                height={24}
                size={2}
                color="#fff"
              />
            )}
          </Button>
        )}
        <Button
          fullWidth
          theme="primaryOutline"
          buttonSize="large"
          onClick={close}
        >
          Закрыть
        </Button>
      </div>}
    </Modal>
  )
}

export { OrderModal }