'use client'
import classes from './profile.module.scss'
import { Wrapper } from '@shared/ui/Wrapper'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { Button } from '@shared/ui/Button'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { logout } from '@modules/auth'
import { useRouter } from 'next/navigation'
import { ProfileContent } from '@modules/profile/ui/ProfileContent'
import { ChangePasswordModal } from '@modules/profile/ui/ChangePasswordModal'
import { useState } from 'react'
import { clearFavoriteProducts } from '@modules/favorite'

function Profile() {
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false)
  const token = useAppSelector(state => state.auth.token)!
  const dispatch = useAppDispatch()
  const router = useRouter()

  const openChangePassword = () => {
    setIsOpenChangePassword(true)
  }

  const closeChangePassword = () => {
    setIsOpenChangePassword(false)
  }

  return (
    <Wrapper className={classes.wrapper}>
      <Breadcrumbs
        className={classes.breadcrumbs}
        includeHome
        items={[{label: 'Личный кабинет', isActive: true}]}
      />
      <header className={classes.header}>
        <h1 className={classes.title}>Личный кабинет</h1>
        <div className={classes.buttons}>
          <Button
            className={classes.changePassword}
            theme="primary"
            buttonSize="large"
            onClick={openChangePassword}
          >
            Изменить пароль
          </Button>
          <Button
            className={classes.logout}
            theme="primary"
            buttonSize="large"
            onClick={() => {
              dispatch(logout(token || ''))
              dispatch(clearFavoriteProducts())
              router.push('/')
            }}
          >
            Выйти из аккаунта
          </Button>
        </div>
      </header>
      <ProfileContent openChangePassword={openChangePassword}/>
      <ChangePasswordModal isOpen={isOpenChangePassword} close={closeChangePassword}/>
    </Wrapper>
  )
}

export { Profile }