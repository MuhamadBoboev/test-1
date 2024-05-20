'use client'
import classes from './product-info.module.scss'
import { IProduct } from '@modules/product/model/IProduct'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { IBreadcrumb } from '@shared/interfaces/IBreadcrumb'
import Link from 'next/link'
import { Sanitize } from '@shared/ui/Sanitize'
import { Attributes } from '@modules/product/ui/Attributes'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { getPriceWithDiscount } from '@modules/product/lib/getPriceWithDiscount'
import { getDefaultAttributes } from '@modules/product/lib/getDefaultAttributes'
import { getProductPrice } from '@modules/product/lib/getProductPrice'
import { ProductCounter } from '@modules/product/ui/ProductCounter'
import { getMaxQuantity } from '@modules/product/lib/getMaxQuantity'
import { Button } from '@shared/ui/Button'
import { ProductProcesses } from '@modules/product/ui/ProductProcesses'
import {
	addToCart,
	changeQuantityProductCart,
	removeFromCart,
} from '@modules/cart'
import { getProductCartId } from '@modules/cart/lib/getProductCartId'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { isProductExistInCart } from '@modules/cart/lib/isProductExistInCart'
import { Spinner } from '@shared/ui/loaders/Spinner'
import { IService, ServicesProductModal } from '@modules/service'
import { useRouter } from 'next/navigation'
import { BlumModal } from '@modules/product/ui/BlumModal'

interface Props {
	product: IProduct
}

export type SelectedAttributesType = {
	[key: string]: number
}

function ProductInfo({ product }: Props) {
	const {
		id,
		name,
		slug,
		category,
		subcategory,
		collection,
		base_price,
		sku,
		provider,
		description,
		attributes,
		discount,
		unit,
		quantity: maxQuantityProduct,
	} = product
	const [selectedAttributes, setSelectedAttributes] =
		useState<SelectedAttributesType>(getDefaultAttributes(attributes))
	const productCartId = getProductCartId({
		productId: id,
		selectedAttributes,
	})
	const productCart = useAppSelector((state) =>
		state.cart.products.find(
			(productCart) => productCart.productCartId === productCartId
		)
	)
	const [quantity, setQuantity] = useState(productCart?.selectedQuantity || 1)
	const [isFetchingAddToCart, setIsFetchingAddToCart] = useState(false)
	const [openedBlumModal, setOpenedBlumModal] = useState<'cart' | 'buy' | null>(
		null
	)
	const [buyButtonText, setBuyButtonText] = useState('Купить')
	const dispatch = useAppDispatch()
	const [isOpenServices, setIsOpenService] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (productCart) {
			setQuantity(productCart?.selectedQuantity)
		}
	}, [productCart])

	const breadcrumbItems: IBreadcrumb[] = [
		{
			label: category.name,
			link: `/products?categories=${category.id}`,
		},
	]
	if (subcategory) {
		breadcrumbItems.push({
			label: subcategory.name,
			link: `/products?subcategories=${subcategory.id}`,
		})
	}
	if (collection) {
		breadcrumbItems.push({
			label: collection.name,
			link: `/products?view=collections&collections=${collection.id}`,
		})
	}

	const selectAttribute = (attributeId: number, productAttributeId: number) => {
		setSelectedAttributes({
			...selectedAttributes,
			[attributeId]: productAttributeId,
		})
		setQuantity(1)
	}

	const price = getProductPrice({
		base_price,
		productAttributes: attributes,
		selectedAttributes,
	})

	const maxQuantity = getMaxQuantity({
		productAttributes: attributes,
		selectedAttributes,
		productQuantity: maxQuantityProduct,
	})

	useEffect(() => {
		if (productCart) {
			dispatch(
				changeQuantityProductCart({
					productCartId,
					quantity,
				})
			)
		}
	}, [quantity, productCartId])

	const isExistsInCart = useAppSelector((state) =>
		isProductExistInCart(state, productCartId)
	)


	let filteredServices: IService[] = []

	if (product.category.services.length) {
		filteredServices = product.category.services
	}
	if (product.subcategory?.services.length) {
		filteredServices = product.category.services
	}
	if (product.excluded_services.length) {
		filteredServices = filteredServices.filter(
			(service) =>
				!product.excluded_services.some(
					(excludedService) => excludedService.id === service.id
				)
		)
	}

	useEffect(() => {
		if (filteredServices.length > 0) {
			setBuyButtonText(isExistsInCart ? 'Продолжить покупку' : 'Купить')
		}
	}, [isExistsInCart, filteredServices])

	return (
		<div className={classes.info}>
			{!!productCart && (
				<ServicesProductModal
					productCart={productCart}
					services={filteredServices}
					isOpen={isOpenServices}
					maxQuantity={quantity}
					close={() => setIsOpenService(false)}
				/>
			)}
			{provider.id === 1 && (
				<BlumModal
					isOpen={openedBlumModal !== null}
					type={openedBlumModal}
					close={() => {
						setOpenedBlumModal(null)
					}}
					addToCart={async () => {
						if (!isExistsInCart) {
							setIsFetchingAddToCart(true)
							await dispatch(
								addToCart({
									selectedAttributes,
									slug,
									selectedQuantity: quantity,
									selectedServices: [],
								})
							)
							setIsFetchingAddToCart(false)
						}
						if (openedBlumModal === 'buy') {
							router.push('/cart')
						}
					}}
				/>
			)}
			<Breadcrumbs
				className={classes.breadcrumbs}
				items={breadcrumbItems}
				includeHome
			/>
			<h1 className={classes.name}>{name}</h1>
			<div className={classes.skuAndProvider}>
				<p className={classes.sku}>Код товара: {sku}</p>
				<p className={classes.provider}>
					Поставщик:&nbsp;
					<Link
						href={`/products?categories=${category.id}&providers=${provider.id}`}
						target="_blank"
					>
						{provider.name}
					</Link>
				</p>
			</div>
			<div className={classes.prices}>
				{discount > 0 && (
					<p className={clsx(classes.price, classes.discountPrice)}>
						{getPriceWithDiscount(price, discount)} сомони
					</p>
				)}
				<p className={clsx(classes.price, discount > 0 && classes.strike)}>
					{price} сомони
				</p>
			</div>
			{description && (
				<div className={classes.description}>
					<Sanitize text={description} />
				</div>
			)}
			{!!attributes.length && (
				<Attributes
					attributes={attributes}
					selectedAttributes={selectedAttributes}
					selectAttribute={selectAttribute}
				/>
			)}
			{maxQuantityProduct > 0 && (
				<ProductCounter
					quantity={quantity}
					setQuantity={setQuantity}
					maxQuantity={maxQuantity}
					unit={unit}
				/>
			)}
			{maxQuantityProduct <= 0 && (
				<p className={classes.info}>Товар не доступен</p>
			)}
			{maxQuantityProduct > 0 && (
				<div className={classes.buttons}>
					<Button
						className={classes.buy}
						fullWidth
						buttonSize="large"
						theme="primary"
						onClick={async () => {
							if (!isExistsInCart) {
								if (provider.id === 1) {
									setOpenedBlumModal('buy')
									return
								}
								setIsFetchingAddToCart(true)
								await dispatch(
									addToCart({
										selectedAttributes,
										slug,
										selectedQuantity: quantity,
										selectedServices: [],
									})
								)
								setIsFetchingAddToCart(false)
								if (!!filteredServices.length) {
									setIsOpenService(true)
								} else {
									router.push('/cart')
								}
							} else {
								router.push('/cart')
							}
							// router.push('/cart')
						}}
					>
						{buyButtonText}
					</Button>
					<Button
						className={classes.toCart}
						fullWidth
						buttonSize="large"
						theme="primary"
						onClick={async () => {
							if (!isExistsInCart) {
								if (provider.id === 1) {
									setOpenedBlumModal('cart')
									return
								}
								setIsFetchingAddToCart(true)
								await dispatch(
									addToCart({
										selectedAttributes,
										slug,
										selectedQuantity: quantity,
										selectedServices: [],
									})
								)
								setIsFetchingAddToCart(false)
							} else {
								dispatch(removeFromCart(productCartId))
							}
						}}
					>
						{isFetchingAddToCart && (
							<Spinner className={classes.spinner} size={32} borderWidth={5} />
						)}
						{!isFetchingAddToCart &&
							(isExistsInCart ? 'Убрать с корзины' : 'Добавить в корзину')}
					</Button>
					{isExistsInCart && !!filteredServices.length && (
						<Button
							className={classes.buy}
							style={{ marginTop: 24 }}
							fullWidth
							buttonSize="large"
							theme="primaryOutline"
							onClick={async () => {
								setIsOpenService(true)
							}}
						>
							Выбрать услуги для товара
						</Button>
					)}
				</div>
			)}
			<ProductProcesses />
		</div>
	)
}

export { ProductInfo }
