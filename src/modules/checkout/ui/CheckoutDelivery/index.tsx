import classes from './checkout-delivery.module.scss'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import clsx from 'clsx'
import { selectDeliveryMethod } from '@modules/checkout'
import { CheckoutPickup } from '@modules/checkout/ui/CheckoutPickup'
import { CheckoutAddress } from '@modules/checkout/ui/CheckoutAddress'
import { TextArea } from '@shared/ui/TextArea'
import { setCheckoutComment } from '@modules/checkout/model/checkoutSlice'
import { Link } from 'react-scroll';
import { Button } from '@/shared/ui/Button'

function CheckoutDelivery() {
	const { data, deliveryMethod } = useAppSelector(state => state.checkout)
	const dispatch = useAppDispatch()

	return (
		<section className={classes.checkoutDelivery} id='delivery1'>
			<h2 className={classes.title} >Способы получения</h2>
			<ul className={classes.list} >
				{data.deliveryMethods.map(({ id, name }) => (
					<li key={id} className={classes.item}>
						<button
							className={clsx(
								classes.button,
								id === deliveryMethod && classes.active,
							)}
							onClick={() => {
								dispatch(selectDeliveryMethod(id))
							}}
						>
							{name}
						</button>
					</li>
				))}
			</ul>
			{deliveryMethod === 'pickup' && <CheckoutPickup />}
			{deliveryMethod === 'shipping' && <CheckoutAddress />}
			<TextArea
				className={classes.textArea}
				label="Комментарий к заказу"
				value={data.comment}

				onChange={(event) => {
					const target = event.target as HTMLInputElement
					dispatch(setCheckoutComment(target.value))
				}}

			/>
			<Link
				activeClass="active"
				spy={true}
				smooth={true}
				duration={800}
				to='order'
				offset={-400}
			>
				<Button className={classes.btn1}>
					Далее

				</Button>
			</Link>
		</section>
	)
}

export { CheckoutDelivery }