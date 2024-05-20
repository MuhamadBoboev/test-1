'use client'
import classes from './services-product-modal.module.scss'
import { IService } from '@modules/service'
import { Modal } from '@shared/ui/Modal'
import { HandySvg } from 'handy-svg'
import { useEffect, useState } from 'react'
import { SelectedServiceList } from '@modules/service/ui/SelectedServiceList'
import { ProductCartState } from '@modules/cart/model/ProductCartState'
import { useAppDispatch } from '@shared/lib/redux-hooks'
import { Button } from '@shared/ui/Button'
import { ServiceProductForm } from '@modules/service/ui/ServiceProductForm'
import { SelectedServicesType } from '@modules/cart/model/SelectedServicesType'
import { addServicesToProduct } from '@modules/cart/lib/addServicesToProduct'
import { removeServiceFromCart } from '@modules/cart'
import { checkEqualServices } from '@modules/service/lib/checkEqualServices'

interface Props {
	productCart?: ProductCartState
	services: IService[]
	isOpen: boolean
	maxQuantity: number

	close(): void
}

function ServicesProductModal({
	services,
	isOpen,
	close,
	productCart,
	maxQuantity,
}: Props) {
	const [selectedServices, setSelectedServices] = useState<SelectedServicesType[]>(productCart?.selectedServices || [])
	const [selectedServiceId, setSelectedServiceId] = useState<number | string>('')
	const [value, setValue] = useState<number>(1)
	const [quantity, setQuantity] = useState(productCart?.selectedQuantity || 1)
	const dispatch = useAppDispatch()

	const servicesPrice = selectedServices.reduce((total, service) => {
		return total + service.serviceValue * service.serviceQuantity * service.service.price
	}, 0)

	const selectedService = services.find(({ id }) => selectedServiceId === id)!

	const selectService = (serviceId: number, serviceQuantity: number, value: number) => {
		if (!selectedServices.some(service => service.serviceId === serviceId)) {
			setSelectedServices([
				...selectedServices,
				{
					serviceId,
					service: services.find(service => service.id === serviceId)!,
					serviceQuantity,
					serviceValue: value,
				}
			])
		}
	}

	const removeService = (serviceId: number) => {
		if (productCart) {
			if (!!productCart.selectedServices.find(selectedService => selectedService.serviceId === serviceId)) {
				dispatch(removeServiceFromCart({
					serviceId,
					productCartId: productCart.productCartId,
				}))
			}
			setSelectedServices(selectedServices.filter(selectedService => selectedService.serviceId !== serviceId))
		}
	}

	useEffect(() => {
		if (productCart?.selectedServices) {
			setSelectedServices(productCart?.selectedServices)
		}
	}, [productCart?.productCartId])

	useEffect(() => {
		setQuantity(maxQuantity)
	}, [maxQuantity])

	if (!productCart) {
		return null
	}

	return (
		<Modal
			isOpen={isOpen}
			close={() => {
				setQuantity(productCart?.selectedQuantity || 1)
				setValue(1)
				// setSelectedServices(productCart?.selectedServices || [])
				setSelectedServiceId('')
				close()
			}}
			isShowCloseButton={false}
			contentClassName={classes.modalContent}
		>
			<header className={classes.header}>
				<h2 className={classes.title}>Выберите услуги</h2>
				<button
					className={classes.close}
					onClick={close}
				>
					<HandySvg
						src="/assets/icons/close.svg"
						width={24}
						height={24}
					/>
				</button>
			</header>
			<div className={classes.content}>
				<div className={classes.selectWrapper}>
					<select
						className={classes.select}
						onChange={(event) => {
							setSelectedServiceId(+event.target.value)
						}}
						value={selectedServiceId}
					>
						<option value="" disabled>Выбрать услугу</option>
						{services
							.filter(service => !selectedServices.find(({ serviceId }) => service.id === serviceId))
							.map(({ id, name, unit }) => (
								<option
									key={id}
									value={id}
								>
									{name} ({unit})
								</option>
							))}
					</select>
					<HandySvg
						src="/assets/icons/arrow-down.svg"
						width={32}
						height={32}
					/>
				</div>
				{!selectedServiceId && <SelectedServiceList
					services={selectedServices}
					productCartId={productCart.productCartId}
					removeService={removeService}
					removeServices={() => setSelectedServices([])}
				/>}
				{!!selectedServiceId && <ServiceProductForm
					service={selectedService}
					productId={productCart.product.id}
					productCartId={productCart.productCartId}
					value={value}
					setValue={setValue}
					quantity={quantity}
					setQuantity={setQuantity}
					maxQuantity={maxQuantity}
					selectService={selectService}
					productCart={productCart}
					close={() => {
						setSelectedServiceId('')
					}}
				/>}
				<div className={classes.buttons}>
					<p className={classes.price}>
						Итого
						<span>{servicesPrice + ((selectedService?.price || 0) * value * quantity)} с.</span>
					</p>
					<div className={classes.buttons_body} >
						<Button
							type="button"
							buttonSize="large"
							theme="primary"
							className={classes.toCart}
							disabled={!selectedServices.length || checkEqualServices({
								productCartServices: productCart.selectedServices,
								selectedServices: selectedServices,
							})}
							onClick={() => {
								dispatch(addServicesToProduct({
									services: selectedServices,
									productId: productCart.product.id,
									productCartId: productCart.productCartId,
								}))
								close()
							}}
						>
							Добавить к товару
						</Button>
						<Button tag='a' href='/cart'>Пропустить</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
}

export { ServicesProductModal }