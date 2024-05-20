'use client'
import { useAppSelector } from '@shared/lib/redux-hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Loading from '@app/products/loading'
import { Profile } from '@modules/profile'

function ProfileProvider() {
  const {user} = useAppSelector(state => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      router.push('/')
    }
  }, [user])

  if (!user) {
    return <Loading/>
  }

  return (
    <Profile/>
  )
}

export { ProfileProvider }