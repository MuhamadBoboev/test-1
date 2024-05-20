'use client'
import classes from './cart.module.scss'
import { Wrapper } from '@shared/ui/Wrapper'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import Link from 'next/link'
import { Button } from '@shared/ui/Button'
import { HandySvg } from 'handy-svg'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { Loader } from '@shared/ui/Loader'
import { calculateTotalPriceCart } from '@modules/cart/lib/calculateTotalPriceCart'
import { openAuth, setAuthLink } from '@modules/auth'
import { SelectedServices } from '@modules/service'
import { CartProducts } from '@modules/cart/ui/CartProducts'
import { servicesPriceSelector } from '@modules/service'

function Cart() {
  const {status, products} = useAppSelector(state => state.cart)
  const {user} = useAppSelector(state => state.auth)
  const servicesPrice = useAppSelector(servicesPriceSelector)
  const dispatch = useAppDispatch()

  if (status === 'pending') {
    return <Loader/>
  }

  const totalPrice = calculateTotalPriceCart(products) + servicesPrice

  return (
    <div className={classes.cart}>
      <Wrapper className={classes.wrapper}>
        <Breadcrumbs
          className={classes.breadcrumbs}
          items={[{label: 'Корзина', isActive: true}]}
          includeHome
        />
        <header className={classes.header}>
          <h1 className={classes.title}>Корзина</h1>
          <div className={classes.buttons}>
            <Link
              className={classes.favorites}
              href="/favorites"
              onClick={(event) => {
                if (!user) {
                  event.preventDefault()
                  dispatch(setAuthLink('/favorites'))
                  dispatch(openAuth())
                }
              }}
            >
              Избранное
            </Link>
            <span className={classes.cartButton}>
              Корзина
            </span>
          </div>
        </header>
        <div className={classes.content}>
          <div className={classes.left}>
            <CartProducts/>
            <SelectedServices/>
          </div>
          {products.length !== 0 && <aside className={classes.right}>
            <p className={classes.total}>
              Итого
              <span>{+totalPrice.toFixed(2)} с.</span>
            </p>
            <Button
              className={classes.toCheckOut}
              buttonSize="large"
              theme="primary"
              fullWidth
              tag={Link}
              href="/checkout"
              onClick={(event) => {
                if (!user) {
                  event.preventDefault()
                  dispatch(setAuthLink('/checkout'))
                  dispatch(openAuth())
                }
              }}
            >
              Перейти к оформлению
              <HandySvg
                src="/assets/icons/arrow-right-small.svg"
                width={24}
                height={24}
              />
            </Button>
          </aside>}
        </div>
      </Wrapper>
    </div>
  )
}

export { Cart }