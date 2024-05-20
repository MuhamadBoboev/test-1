'use client'
import classes from './orders.module.scss'
import useSWR from 'swr'
import { IOrderData } from '@modules/order/model/IOrder'
import { getOrders } from '@modules/order/api/getOrders'
import { useAppSelector } from '@shared/lib/redux-hooks'
import { useState } from 'react'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import { OrderList } from '@modules/order/ui/OrderList'
import { Pagination } from '@shared/ui/Pagination'
import { OrderModal } from '@modules/order/ui/OrderModal'

function Orders() {
  const token = useAppSelector(state => state.auth.token)!
  const [page, setPage] = useState(1)
  const {
    data: orders,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<IOrderData>(`/me/orders?per_page=6&page=${page}`, (url) => getOrders(url, token), {
    revalidateOnFocus: false,
  })

  const isShowLoader = isLoading || isValidating || !orders

  const handleChangePage = ({selected}: { selected: number }) => {
    setPage(selected + 1)
  }

  return (
    <section className={classes.orders}>
      <OrderModal mutate={mutate}/>
      <h2 className={classes.title}>Последние заказы</h2>
      <div className={classes.content}>
        {!isShowLoader && !orders.meta.total && (
          <p className={classes.emptyTitle}>Нет заказов</p>
        )}
        {isShowLoader && (
          <div className={classes.loader}>
            <BarLoader
              color="#FE7100"
              width={30}
              height={30}
              size={3}
            />
          </div>
        )}
        {!isShowLoader && !!orders.meta.total && orders && <div className={classes.main}>
          <OrderList orders={orders}/>
          <Pagination
            className={classes.pagination}
            pageCount={orders?.meta.last_page}
            forcePage={page - 1}
            onPageChange={handleChangePage}
          />
        </div>}
      </div>
    </section>
  )
}

export { Orders }