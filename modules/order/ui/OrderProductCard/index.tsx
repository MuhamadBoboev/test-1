import classes from './order-product-card.module.scss'
import { IOrderProduct } from '@modules/order/model/IOrderProduct'
import Image from 'next/image'
import { getPriceWithDiscount } from '@modules/product/lib/getPriceWithDiscount'
import clsx from 'clsx'

function OrderProductCard({
                            product_name,
                            product_image,
                            product_sku,
                            product_discount,
                            quantity,
                            product_base_price,
                            attributes,
                            product_unit,
                          }: IOrderProduct) {
  return (
    <article className={classes.card}>
      <div className={classes.left}>
        <Image
          className={classes.img}
          src={product_image || '/assets/icons/box.svg'}
          alt={product_name}
          width={100}
          height={100}
        />
      </div>
      <div className={classes.right}>
        <h3 className={classes.productName}>{product_name}</h3>
        <dl className={classes.list}>
          <div className={classes.item}>
            <dt className={classes.name}>Код товара:</dt>
            <dd className={classes.value}>{product_sku}</dd>
          </div>
          <div className={classes.item}>
            <dt className={classes.name}>Количество:</dt>
            <dd className={classes.value}>{quantity}{product_unit}</dd>
          </div>
          {product_discount > 0 && <div className={classes.item}>
            <dt className={classes.name}>Скидка:</dt>
            <dd className={classes.value}>{product_discount}%</dd>
          </div>}
          <div className={classes.item}>
            <dt className={classes.name}>Цена:</dt>
            <dd className={classes.value}>{product_base_price} с.</dd>
          </div>
        </dl>
        {attributes.map(({id, attribute_name, attribute_value, attribute_unit}) => (
          <div key={id} className={classes.item}>
            <dt className={classes.name}>{attribute_name}:</dt>
            <dd className={classes.value}>{attribute_value} {attribute_unit}</dd>
          </div>
        ))}
        <div className={classes.prices}>
          <span>Сумма </span>
          {product_discount > 0 && (
            <p className={classes.discountPrice}>
              {getPriceWithDiscount(product_base_price * quantity, product_discount)} с.
            </p>
          )}
          <p
            className={clsx(classes.price, product_discount && classes.strike)}
          >{product_base_price * quantity} с.</p>
        </div>
      </div>
    </article>
  )
}

export { OrderProductCard }