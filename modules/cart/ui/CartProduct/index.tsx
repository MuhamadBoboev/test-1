import classes from './cart-product.module.scss'
import { ProductCartState } from '@modules/cart/model/ProductCartState'
import { useAppDispatch } from '@shared/lib/redux-hooks'
import Image from 'next/image'
import Link from 'next/link'
import { CounterPanel } from '@shared/ui/CounterPanel'
import { useEffect, useState } from 'react'
import { removeFromCart } from '@modules/cart'
import { HandySvg } from 'handy-svg'
import { changeQuantityProductCart } from '@modules/cart/lib/changeQuantityProductCart'
import {
  getMaxQuantity,
  getProductPrice,
  getSelectedProductAttributes,
} from '@modules/product'

function CartProduct({
  product,
  productCartId,
  selectedQuantity,
  selectedAttributes,
}: ProductCartState) {
  const [quantity, setQuantity] = useState(selectedQuantity)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      changeQuantityProductCart({
        productCartId,
        quantity,
      })
    )
  }, [quantity])

  const {
    image,
    provider,
    name,
    quantity: productQuantity,
    base_price,
    attributes,
  } = product

  const selectedAttributeList = getSelectedProductAttributes({
    productAttributes: attributes,
    selectedAttributes,
  })

  const maxQuantity = getMaxQuantity({
    productAttributes: attributes,
    selectedAttributes,
    productQuantity,
  })

  const price = getProductPrice({
    base_price,
    productAttributes: attributes,
    selectedAttributes,
  })

  const totalPrice = `${+(price * quantity).toFixed(2)} с.`

  return (
    <div className={classes.card}>
      <button
        className={classes.close}
        onClick={() => dispatch(removeFromCart(productCartId))}
        aria-label="Убрать с корзины"
      >
        <HandySvg src="/assets/icons/close.svg" width={16} height={16} />
      </button>
      <div className={classes.left}>
        <Image
          className={classes.img}
          src={image}
          alt={name}
          width={192}
          height={160}
        />
      </div>
      <div className={classes.right}>
        <div className={classes.col1}>
          <Link
            className={classes.provider}
            href={`/providers/${provider.slug}`}
            target="_blank"
          >
            {provider.name}
          </Link>
          <h3 className={classes.name}>{name}</h3>
          <dl className={classes.attributes}>
            {selectedAttributeList.map(({ id, attribute, value }) => (
              <div key={id} className={classes.item}>
                <dt className={classes.attributeName}>{attribute.name}</dt>
                <dd className={classes.attributeValue}>
                  {value}&nbsp;{attribute.unit}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={classes.col2}>
          <div className={classes.counter}>
            <CounterPanel
              size="small"
              className={classes.panel}
              quantity={quantity}
              setQuantity={setQuantity}
              maxQuantity={maxQuantity}
            />
            {/* <p className={classes.price}>
              {price} с./{product.unit}
            </p> */}
          </div>
          <div className={classes.col3}>
            <div className={classes.total}>
              <p className={classes.totalPrice}>
                <span>{totalPrice}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CartProduct }
