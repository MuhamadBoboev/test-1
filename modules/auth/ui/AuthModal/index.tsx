'use client'
import classes from './auth-modal.module.scss'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { closeAuth, openAuth } from '@modules/auth/model/authSlice'
import { Modal } from '@shared/ui/Modal'
import Image from 'next/image'
import { Login } from '@modules/auth/ui/Login'
import { SuccessAuth } from '@modules/auth/ui/SuccessAuth'
import { useEffect, useState } from 'react'
import { getAuthSuccessText } from '@modules/auth/lib/getAuthSuccessText'
import { Register } from '@modules/auth/ui/Register'
import { authViewType } from '@modules/auth/lib/authViewType'

function AuthModal() {
  const {isOpen, type} = useAppSelector(state => state.auth)
  const [authView, setAuthView] = useState<authViewType>(type === 'register' ? 'registerForm' : 'loginForm')
  const dispatch = useAppDispatch()

  useEffect(() => {
    let time: ReturnType<typeof setTimeout>
    if (!isOpen) {
      time = setTimeout(() => {
        setAuthView('loginForm')
      }, 300)
    }

    return () => {
      clearTimeout(time)
    }
  }, [isOpen])

  const {title, description} = getAuthSuccessText(authView)

  const changeAuthMethod = (type: 'login' | 'register') => {
    dispatch(openAuth(type))
    setAuthView(type === 'register' ? 'registerForm' : 'loginForm')
  }

  return (
    <Modal
      isOpen={isOpen}
      close={() => dispatch(closeAuth())}
    >
      <div className={classes.block}>
        <Image
          className={classes.logo}
          src="/assets/img/logo.svg"
          alt="PRO MEBEL"
          width={190}
          height={62}
        />
        <Login
          show={authView === 'loginForm'}
          changeAuthView={setAuthView}
          changeAuthMethod={changeAuthMethod}
        />
        <Register
          show={authView === 'registerForm'}
          changeAuthView={setAuthView}
          changeAuthMethod={changeAuthMethod}
        />
        <SuccessAuth
          title={title}
          description={description}
          show={authView === 'loginSuccess' || authView === 'registerSuccess'}
        />
      </div>
    </Modal>
  )
}

export { AuthModal }