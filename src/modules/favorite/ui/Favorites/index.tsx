'use client'
import classes from './favorites.module.scss'
import { Wrapper } from '@shared/ui/Wrapper'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import Link from 'next/link'
import { IProduct } from '@modules/product/model/IProduct'
import { FavoriteList } from '@modules/favorite/ui/FavoriteList'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@shared/lib/redux-hooks'
import { useRouter } from 'next/navigation'
import { getFavorites } from '@modules/favorite/api/getFavorites'
import { Loader } from '@shared/ui/Loader'

function Favorites() {
  const [products, setProducts] = useState<IProduct[] | null>(null)
  const {token} = useAppSelector(state => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      getFavorites(window.localStorage.getItem('token') || '')
        .then(favorites => {
          if (favorites) {
            setProducts(favorites)
          } else {
            setProducts(null)
          }
        })
    } else {
      router.push('/')
    }
  }, [token])

  if (!products) {
    return <Loader/>
  }

 

  return (
    <div className={classes.favorites}>
      <Wrapper className={classes.wrapper}>
        <Breadcrumbs
          className={classes.breadcrumbs}
          items={[{label: 'Избранное', isActive: true}]}
          includeHome
        />
        <header className={classes.header}>
          <h1 className={classes.title}>Избранное</h1>
          <div className={classes.buttons}>
            <span
              className={classes.favoritesButton}
            >
              Избранное
            </span>
            <Link
              className={classes.cartButton}
              href="/cart"
            >
              Корзина
            </Link>
          </div>
        </header>
        {products.length === 0 && (
          <p className={classes.emptyTitle}>Нет товаров</p>
        )}
        <FavoriteList products={products} />
      </Wrapper>
    </div>
  )
}

export { Favorites }