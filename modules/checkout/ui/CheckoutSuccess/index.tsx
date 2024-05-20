import classes from './checkout-success.module.scss'
import { SuccessAnimated } from '@shared/ui/SuccessAnimated'
import { Button } from '@shared/ui/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  close(): void
}

function CheckoutSuccess({close}: Props) {
  const router = useRouter()

  useEffect(() => {
    return () => {
      router.push('/profile')
    }
  }, [])

  return (
    <div>
      <SuccessAnimated/>
      <h2 className={classes.title}>Ваш заказ<br/> успешно оформлен</h2>
      <p className={classes.description}>Для продолжения перейдите в личный кабинет или на главную страницу</p>
      <div className={classes.buttons}>
        <Button
          buttonSize="large"
          fullWidth
          className={classes.toProfile}
          tag={Link}
          href="/profile"
          onClick={close}
        >
          Личный кабинет
        </Button>
      </div>
    </div>
  )
}

export { CheckoutSuccess }