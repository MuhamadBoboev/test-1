import classes from './cart-products.module.scss'
import { Button } from '@shared/ui/Button'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { clearCart } from '@modules/cart/lib/clearCart'
import { CartProduct } from '@modules/cart/ui/CartProduct'

function CartProducts() {
  const { products } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()

  return (
    <section className={classes.products}>
      <header className={classes.header}>
        <h2 className={classes.title}>Товары в корзине</h2>
        {!!products.length && (
          <Button
            className={classes.clear}
            theme="primary"
            buttonSize="small"
            onClick={() => dispatch(clearCart())}
          >
            Очистить
          </Button>
        )}
      </header>
      {!products.length && <p className={classes.emptyCart}>Корзина пуста</p>}
      <ul className={classes.list}>
        {products.map((productCart) => (
          <li key={productCart.productCartId} className={classes.item}>
            <CartProduct {...productCart} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export { CartProducts }
