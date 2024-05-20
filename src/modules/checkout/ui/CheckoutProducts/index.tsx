import classes from './checkout-products.module.scss'
import { useAppSelector } from '@shared/lib/redux-hooks'
import { getSelectedProductAttributes } from '@modules/product/lib/getSelectedProductAttributes'
import { getProductPrice } from '@modules/product/lib/getProductPrice'
import clsx from 'clsx'

function CheckoutProducts() {
  const {products} = useAppSelector(state => state.cart)
  return (
    <section className={classes.checkoutProducts}>
      <h2 className={classes.title}>Список товаров</h2>
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead className={classes.thead}>
          <tr className={classes.headRow}>
            <td className={clsx(classes.headTitle, classes.headName)}>Название товара</td>
            <td className={clsx(classes.headTitle, classes.headAttributes)}>Атрибуты</td>
            <td className={clsx(classes.headTitle, classes.headQuantity)}>Количество, шт</td>
            <td className={clsx(classes.headTitle, classes.headPrice)}>Стоимость</td>
          </tr>
          </thead>
          <tbody>
          {products.map(({product, productCartId, selectedQuantity, selectedAttributes}) => {
            const attributes = getSelectedProductAttributes({
              selectedAttributes,
              productAttributes: product.attributes,
            })

            const productAttributes = attributes
              .map(({attribute, value}) => `${attribute.name}: ${value}${attribute.unit || ''}`)
              .join(', ')

            const price = getProductPrice({
              productAttributes: product.attributes,
              base_price: product.base_price,
              selectedAttributes,
            })
            return (
              <tr
                key={productCartId}
                className={classes.row}
              >
                <td
                  title={product.name}
                  className={clsx(classes.value, classes.productName)}
                ><span>{product.name}</span></td>
                <td
                  title={productAttributes}
                  className={clsx(classes.value, classes.attributes)}
                >
                  <span>{productAttributes}</span>
                </td>
                <td
                  title={product.quantity.toString()}
                  className={clsx(classes.value, classes.quantity)}
                >{selectedQuantity}</td>
                <td
                  title={price.toString().concat(' с.')}
                  className={clsx(classes.value, classes.price)}
                >{price} с.
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export { CheckoutProducts }