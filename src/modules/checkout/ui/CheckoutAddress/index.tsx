import classes from './checkout-address.module.scss'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { HandySvg } from 'handy-svg'
import { inputClientAddress, selectShippingLocation, selectShippingType } from '@modules/checkout'
import clsx from 'clsx'
import { Input } from '@shared/ui/Input'
import { useEffect } from 'react'

function CheckoutAddress() {
	const { data, deliveryMethod, shippingLocationId, shippingTypeId, clientAddress } = useAppSelector(state => state.checkout)
	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)

	useEffect(() => {
		if (user?.address) {
			dispatch(inputClientAddress(user.address))
		}
	}, [user])
	const shippingLocation = data.shippingLocations?.find(({ id }) => shippingLocationId === id)
	const shippingType = data.shippingTypes?.find(({ id }) => shippingTypeId === id)

	return (
		<div className={classes.delivery}>
			<h3 className={classes.title}>Выберите локацию</h3>
			<div className={classes.selectWrapper}>
				<select
					className={clsx(classes.select,
						deliveryMethod === 'shipping' && (!!shippingLocation && !!shippingType) ? '' : classes.error)}
					onChange={(event) => {
						dispatch(selectShippingLocation(+event.target.value))
					}}
					value={shippingLocationId?.toString()}
				>
					<option value={undefined}>Не выбран</option>
					{data.shippingLocations?.map(({ id, name, price, is_active }) => (
						<option key={id} value={id} disabled={!is_active}>
							{name} - (от {price} смн.)
						</option>
					))}
				</select>
				<HandySvg
					src="/assets/icons/arrow-down.svg"
					width={32}
					height={32}
				/>
			</div>
			{!!shippingLocationId && <div className={classes.shippingType}>
				<h3 className={classes.title}>Выберите вид доставки:</h3>
				<ul className={classes.list}>
					{data.shippingTypes?.filter(({ is_active }) => is_active).map(({ id, name, is_active }) => (
						<li key={id} className={classes.item}>
							<button
								className={clsx(
									classes.button,
									shippingTypeId === id && classes.active,
								)}
								disabled={!is_active}
								onClick={() => {
									dispatch(selectShippingType(id))
								}}
							>
								{name}
							</button>
						</li>
					))}
				</ul>
			</div>}
			{!!shippingLocationId && <div className={classes.clientAddress}>
				<Input
					label="Напишите адрес доставки"
					value={clientAddress}
					onChange={(event: any) => {
						dispatch(inputClientAddress(event.target.value))
					}}
				/>
			</div>}
		</div>
	)
}

export { CheckoutAddress }