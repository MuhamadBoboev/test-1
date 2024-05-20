import classes from './order-list.module.scss'
import { IOrderData } from '@modules/order/model/IOrder'
import clsx from 'clsx'
import { useAppDispatch } from '@shared/lib/redux-hooks'
import { openOrder } from '@modules/order/model/orderSlice'

interface Props {
  orders: IOrderData
}

function OrderList({orders}: Props) {
  const dispatch = useAppDispatch()

  return (
    <div className={classes.tableWrapper}>
      <table className={classes.table}>
        <thead>
        <tr className={classes.headRow}>
          <td className={clsx(classes.headCol, classes.headId)}>ID заказа</td>
          <td className={clsx(classes.headCol, classes.headQuantity)}>Кол-во товаров</td>
          <td className={clsx(classes.headCol, classes.headTotal)}>Сумма</td>
          <td className={clsx(classes.headCol, classes.headDate)}>Дата</td>
          <td className={clsx(classes.headCol, classes.headStatus)}>Статус заказа</td>
        </tr>
        </thead>
        <tbody>
        {orders.data.map((order) => {
          const {id, items, sub_total, created_at, status} = order
          const date = new Date(created_at).toLocaleDateString('ru')
          const total = (+sub_total.toFixed(2)) + ' с.'

          const quantity = items.reduce((count, currProduct) => {
            return count + currProduct.quantity
          }, 0)
          return (
            <tr
              key={id}
              className={classes.row}
              onClick={() => dispatch(openOrder(order))}
            >
              <td
                title={id.toString()}
                className={clsx(classes.col, classes.id)}
              >{id}</td>
              <td
                title={quantity.toString()}
                className={clsx(classes.col, classes.quantity)}
              >{quantity}</td>
              <td
                title={total}
                className={clsx(classes.col, classes.total)}
              >
                {total}
              </td>
              <td
                title={date}
                className={clsx(classes.col, classes.date)}
              >{date}</td>
              <td
                title={status.name}
                className={clsx(classes.col, classes.status)}
              >{status.name}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export { OrderList }