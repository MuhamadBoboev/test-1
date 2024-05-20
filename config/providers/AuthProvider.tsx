'use client'
import { ReactNode, useEffect } from 'react'
import { getProfile } from '@modules/auth/api/getProfile'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { setToken, setUserData } from '@modules/auth/model/authSlice'
import { loadProductsCart } from '@modules/cart'
import { loadFavoritesIds } from '@modules/favorite/api/loadFavoritesIds'

function AuthProvider({children}: { children: ReactNode }) {
  const dispatch = useAppDispatch()
  const {token} = useAppSelector(state => state.auth)

  useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem('token')
      const profile = await getProfile(token)
      if (profile) {
        dispatch(setUserData(profile))
        dispatch(setToken(token))
      } else {
        localStorage.removeItem('token')
      }
      await dispatch(loadProductsCart())
    })()
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(loadFavoritesIds(token))
    }
  }, [token])

  return <>{children}</>
}

export { AuthProvider }