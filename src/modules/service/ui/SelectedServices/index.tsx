'use client'
import classes from './selected-services.module.scss'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { getSelectedServices } from '@modules/service'
import { HandySvg } from 'handy-svg'
import { removeServiceFromCart } from '@modules/cart'

interface Props {
  isAllowRemove?: boolean
}

function SelectedServices({isAllowRemove = true}: Props) {
  const selectedServices = useAppSelector(state => getSelectedServices(state.cart.products))
  const {products} = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()

  if (!selectedServices.length) {
    return null
  }

  return (
    <section className={classes.services}>
      <h2 className={classes.title}>Список услуг</h2>
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead className={classes.thead}>
          <tr className={classes.headRow}>
            <td className={clsx(classes.headTitle, classes.headName)}>Название услуги</td>
            <td className={clsx(classes.headTitle, classes.headProducts)}>Кол-во товара</td>
            <td className={clsx(classes.headTitle, classes.headValue)}>Значение</td>
            <td className={clsx(classes.headTitle, classes.headPrice)}>Стоимость</td>
            <td className={clsx(classes.headTitle, classes.headTotal)}>Итого</td>
          </tr>
          </thead>
          <tbody>
          {selectedServices.map(({service, serviceQuantity, serviceValue, productCartId}) => {
            const {id, name, unit, price} = service

            const product = products.find(productCart => productCart.productCartId === productCartId)

            const productQuantity = serviceQuantity.toString() + ` ${product?.product.unit || ''}`
            const value = `${serviceValue} ${unit}`
            const priceText = `${price} с. / ${unit}`
            const total = `${price * serviceQuantity * serviceValue} с.`
            return (
              <tr
                key={id}
                className={classes.row}
              >
                <td
                  title={name}
                  className={clsx(classes.value, classes.productName)}
                ><span>{name}</span></td>
                <td
                  title={productQuantity}
                  className={clsx(classes.value, classes.productQuantity)}
                >
                  <span>{productQuantity}</span>
                </td>
                <td
                  title={value}
                  className={clsx(classes.value, classes.serviceValue)}
                >{value}</td>
                <td
                  title={priceText}
                  className={clsx(classes.value, classes.price)}
                >
                  {priceText}
                </td>
                <td
                  title={total}
                  className={clsx(classes.value, classes.total)}
                >
                  {total}
                </td>
                {isAllowRemove && <td
                  title="Удалить"
                  className={clsx(classes.value, classes.total)}
                >
                  <button
                    className={classes.remove}
                    aria-label="Удалить"
                    onClick={() => {
                      dispatch(removeServiceFromCart({
                        serviceId: id,
                        productCartId,
                      }))
                    }}
                  >
                    <HandySvg
                      src="/assets/icons/close.svg"
                      width={16}
                      height={16}
                    />
                  </button>
                </td>}
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export { SelectedServices }