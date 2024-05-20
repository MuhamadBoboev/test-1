'use client'
import classes from './header-right.module.scss'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { toggleSearch } from '@widgets/Search/model/searchSlice'
import { openAuth, setAuthLink } from '@modules/auth/model/authSlice'
import { usePathname } from 'next/navigation'
import { CountChip } from '@shared/ui/CountChip'
import toast from 'react-hot-toast'

function HeaderRight() {
  const isOpenSearch = useAppSelector(state => state.search.isOpen)
  const {user} = useAppSelector(state => state.auth)
  const cartProducts = useAppSelector(state => state.cart.products)
  const favorites = useAppSelector(state => state.favorite.products)
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  return (
    <div className={classes.links}>
      <Link
        className={clsx(
          classes.link,
          classes.favorite,
          pathname === '/favorites' && classes.activeFavorite
        )}
        href="/favorites"
        onClick={(event) => {
          if (!user) {
            event.preventDefault()
            dispatch(setAuthLink('/favorites'))
            dispatch(openAuth())
            toast('Сначала авторизуйтесь')
          }
        }}
      >
        <HandySvg
          src="/assets/icons/heart.svg"
          width={24}
          height={24}
        />
        Избранное
        {pathname !== '/favorites' && <CountChip
          count={favorites.length}
          className={classes.favoriteChip}
        />}
      </Link>
      <Link
        className={clsx(
          classes.link,
          classes.cart,
          pathname === '/cart' && classes.activeCart
        )}
        href="/cart"
      >
        <HandySvg
          src="/assets/icons/cart.svg"
          width={24}
          height={24}
        />
        Корзина
        {pathname !== '/cart' && <CountChip count={cartProducts.length}/>}
      </Link>
      <button
        className={clsx(classes.link, classes.search)}
        aria-label="Поиск"
        onClick={() => {
          dispatch(toggleSearch())
        }}
      >
        <HandySvg
          src={`/assets/icons/${isOpenSearch ? 'close' : 'search'}.svg`}
          width={24}
          height={24}
        />
      </button>
      {!user && <button
        className={clsx(classes.link, classes.login)}
        onClick={() => dispatch(openAuth())}
      >
        <HandySvg
          src="/assets/icons/sign-in.svg"
          width={24}
          height={24}
        />
        Войти
      </button>}
      {!!user && (
        <Link
          href="/profile"
          className={clsx(
            classes.link,
            classes.profile,
            pathname === '/profile' && classes.activeProfile
          )}
        >
          <HandySvg
            src="/assets/icons/profile.svg"
            width={24}
            height={24}
          />
          Профиль
        </Link>
      )}
    </div>
  )
}

export { HeaderRight }