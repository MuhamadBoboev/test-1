import classes from './checkout-order.module.scss'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { calculateTotalPriceCart } from '@modules/cart/lib/calculateTotalPriceCart'
import { Button } from '@shared/ui/Button'
import { useState } from 'react'
import { storeOrder } from '@modules/checkout/api/storeOrder'
import { clearCart } from '@modules/cart/lib/clearCart'
import toast from 'react-hot-toast'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import { CheckoutOrderModal } from '@modules/checkout/ui/CheckoutOrderModal'
import { setCheckoutComment } from '@modules/checkout/model/checkoutSlice'
import { servicesPriceSelector } from '@modules/service'
import { IOrder } from '@modules/order/model/IOrder'

function CheckoutOrder() {
	const {
		data,
		paymentMethodId,
		deliveryMethod,
		shippingLocationId,
		shippingTypeId,
		clientAddress,
	} = useAppSelector(state => state.checkout)
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'pending' | 'fulfilled' | 'rejected'>('idle')
	const [responseOrder, setResponseOrder] = useState<IOrder | null>(null)
	const { products } = useAppSelector(state => state.cart)
	const servicesPrice = useAppSelector(servicesPriceSelector)
	const token = useAppSelector(state => state.auth.token)!
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [modalType, setModalType] = useState<'cash-payment' | 'card-payment' | 'qr' | null>(null)
	const dispatch = useAppDispatch()

	const totalPrice = calculateTotalPriceCart(products)

	const shippingLocation = data.shippingLocations?.find(({ id }) => shippingLocationId === id)
	const shippingType = data.shippingTypes?.find(({ id }) => shippingTypeId === id)
	const paymentMethod = data.paymentMethods?.find(({ id }) => paymentMethodId === id)!

	let deliveryPrice = 0

	if (deliveryMethod === 'shipping' && (!!shippingLocation && !!shippingType)) {
		deliveryPrice = shippingLocation.price + (shippingType.price || 0)
	}

	let submitContent: any = {
		idle: {
			['cash-payment']: 'Оформить заказ',
			['card-payment']: 'Оформить заказ',
			['qr']: 'Показать QR',
			default: 'Оформить заказ'
		},
		pending: {
			default: (
				<BarLoader
					color="#fff"
					width={20}
					height={20}
					size={3}
				/>
			)
		},
		fulfilled: {
			['cash-payment']: 'Оформить заказ',
			['card-payment']: 'Оформить заказ',
			['qr']: 'Показать QR',
			default: 'Оформить заказ'
		},
		rejected: {
			['cash-payment']: 'Оформить заказ',
			['card-payment']: 'Оформить заказ',
			['qr']: 'Показать QR',
			default: 'Оформить заказ'
		}
	}

	return (
		<section className={classes.checkoutOrder} id='order'>
			<CheckoutOrderModal
				order={responseOrder}
				type={modalType}
				close={() => setIsOpenModal(false)}
				isOpen={isOpenModal}
			/>
			<h2 className={classes.title}>Ваш заказ</h2>
			<dl className={classes.list}>
				<div className={classes.item}>
					<dt className={classes.name}>Товары</dt>
					<dd className={classes.value}>{totalPrice} с.</dd>
				</div>
				{servicesPrice > 0 && <div className={classes.item}>
					<dt className={classes.name}>Услуги</dt>
					<dd className={classes.value}>{servicesPrice} с.</dd>
				</div>}
				{!!deliveryPrice && (
					<div className={classes.item}>
						<dt className={classes.name}>Стоимость доставки</dt>
						<dd className={classes.value}>{+deliveryPrice.toFixed(2)} с.</dd>
					</div>
				)}
			</dl>
			<p className={classes.totalPrice}>
				Итоговая сумма
				<span>{+(totalPrice + deliveryPrice + servicesPrice).toFixed(2)} с.</span>
			</p>
			<Button
				className={classes.submit}
				type="button"
				theme="primary"
				fullWidth
				buttonSize="large"
				disabled={deliveryMethod === 'shipping' && (!shippingLocation || !shippingType)}
				onClick={async () => {
					switch (paymentMethod.key) {
						case 'qr':
							setIsOpenModal(true)
							setModalType('qr')
							break
						case 'cash-payment':
						case 'card-payment':
							setSubmitStatus('pending')
							const response = await storeOrder({
								deliveryMethod,
								cartProducts: products,
								payment_method_id: paymentMethodId!,
								shipping_address: clientAddress,
								shipping_location_id: shippingLocationId,
								shipping_type_id: shippingTypeId,
								token,
								comment: data.comment,
							})
							if (response.success) {
								setSubmitStatus('fulfilled')
								dispatch(clearCart())
								setIsOpenModal(true)
								setModalType(paymentMethod.key)
								setResponseOrder(response.data.data)
							} else {
								setSubmitStatus('rejected')
								toast.error('Произошла ошибка')
							}
							break
					}
					dispatch(setCheckoutComment(''))
				}}
			>
				{deliveryMethod === 'shipping' && (!shippingLocation || !shippingType) ? 'Выберите локацию' : submitContent[submitStatus][paymentMethod?.key || 'default'] || submitContent[submitStatus]['default']}
			</Button>
		</section>
	)
}

export { CheckoutOrder }