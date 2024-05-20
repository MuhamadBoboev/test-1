'use client'
import classes from './product-card.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { HandySvg } from 'handy-svg'
import clsx from 'clsx'
import { getProductPrice } from '@modules/product/lib/getProductPrice'
import { getDefaultAttributes } from '@modules/product/lib/getDefaultAttributes'
import { getPriceWithDiscount } from '@modules/product/lib/getPriceWithDiscount'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { addToCart } from '@modules/cart'
import { isProductExistInCartForProductCard } from '@modules/cart/lib/isProductExistInCart'
import { IProduct } from '@modules/product/model/IProduct'
import { getMaxQuantity } from '@modules/product/lib/getMaxQuantity'
import { useState } from 'react'
import { removeProductFromCart } from '@modules/cart/lib/removeFromCart'
import { Button } from '@shared/ui/Button'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import { toggleFavoriteProduct } from '@modules/product/api/toggleFavoriteProduct'
import { loadFavoritesIds } from '@modules/favorite'
import { Spinner } from '@shared/ui/loaders/Spinner'
import { BlumModal } from '@modules/product/ui/BlumModal'
import { useRouter } from 'next/navigation'
import { clearFavoriteProducts } from '@modules/favorite'

interface Props extends IProduct {
  className?: string
}

function ProductCard({
  id,
  className,
  name,
  attributes,
  discount,
  slug,
  base_price,
  category,
  provider,
  image,
  quantity,
}: Props) {
  const [isFetchingToggleFavorites, setIsFetchingToggleFavorites] =
    useState(false)
  const defaultImageUrl = '/assets/icons/default-product.svg'
  const [imageUrl, setImageUrl] = useState(image ?? defaultImageUrl)
  const [isFetchingAddToCart, setIsFetchingAddToCart] = useState(false)
  const { token } = useAppSelector((state) => state.auth)
  const [products, setProducts] = useState<IProduct[] | null>(null)
  const isExistsInFavorites = useAppSelector((state) =>
    state.favorite.products.includes(id)
  )
  const [openedBlumModal, setOpenedBlumModal] = useState<'cart' | 'buy' | null>(
    null
  )
  const router = useRouter()
  const dispatch = useAppDispatch()
  const selectedAttributes = getDefaultAttributes(attributes)
  const isExistsInCart = useAppSelector((state) =>
    isProductExistInCartForProductCard(state, id)
  )

  const price = getProductPrice({
    base_price,
    productAttributes: attributes,
    selectedAttributes,
  })

  const maxQuantity = getMaxQuantity({
    productAttributes: attributes,
    selectedAttributes,
    productQuantity: quantity,
  })

  return (
    <article className={clsx(classes.card, className)}>
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
                  selectedQuantity: 1,
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
      <Link
        href={`/products/${slug}`}
        className={classes.link}
        aria-label={name}
      />
      <div className={classes.main}>
        <div className={classes.top}>
          <div className={classes.buttons}>
            <Link
              className={classes.provider}
              href={`/providers/${provider.slug}`}
            >
              {provider.name}
            </Link>
            {!!token && (
              <button
                className={clsx(
                  classes.toFavorite,
                  isExistsInFavorites && classes.removeFromFavorite
                )}
                aria-label={
                  isExistsInFavorites
                    ? 'Добавить в избранное'
                    : 'Убрать из избранных'
                }
                disabled={isFetchingToggleFavorites}
                onClick={async () => {
                  setIsFetchingToggleFavorites(true)
                  await toggleFavoriteProduct(id, token)
                  await dispatch(loadFavoritesIds(token))
                  setIsFetchingToggleFavorites(false)
                }}
              >
                {!isFetchingToggleFavorites && (
                  <HandySvg
                    src="/assets/icons/heart.svg"
                    width={16}
                    height={16}
                  />
                )}
                {isFetchingToggleFavorites && (
                  <Spinner size={20} borderWidth={2} />
                )}
              </button>
            )}
          </div>
          <Image
            className={classes.img}
            src={imageUrl}
            alt={name}
            width={288}
            height={255}
            onError={() => {
              setImageUrl(defaultImageUrl)
            }}
          />
        </div>
        <div className={classes.info}>
          <p className={classes.category}>{category.name}</p>
          <h3 className={classes.name}>{name}</h3>
          <div className={classes.prices}>
            {discount > 0 && (
              <p className={classes.discountPrice}>
                {getPriceWithDiscount(price, discount)} с.
              </p>
            )}
            <p className={clsx(classes.price, discount && classes.strike)}>
              {price} с.
            </p>
          </div>
        </div>
      </div>
      {maxQuantity > 0 && (
        <Button
          theme="primary"
          aria-label={
            isExistsInCart ? 'Убрать с корзины' : 'Добавить в корзину'
          }
          className={clsx(
            classes.toCart,
            isExistsInCart && classes.removeFromCart
          )}
          onClick={async (event) => {
            event.preventDefault()
            event.stopPropagation()
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
                  selectedQuantity: 1,
                  selectedServices: [],
                })
              )
              setIsFetchingAddToCart(false)
            } else {
              dispatch(removeProductFromCart(id))
            }
          }}
        >
          <span className={classes.desktopCartText}>
            {!isFetchingAddToCart &&
              (isExistsInCart ? 'Убрать с корзины' : 'Добавить в корзину')}
          </span>
          <span className={classes.mobileCartText}>
            {!isFetchingAddToCart &&
              (isExistsInCart ? 'Убрать из корзины' : 'Добавить в корзину')}
          </span>
          {!isFetchingAddToCart && (
            <HandySvg src="/assets/icons/cart2.svg" width={16} height={16} />
          )}
          {isFetchingAddToCart && (
            <BarLoader size={2} width={20} height={20} color="#fff" />
          )}
        </Button>
      )}
    </article>
  )
}

export { ProductCard }
