'use client'
import classes from './success-auth.module.scss'
import { SuccessAnimated } from '@shared/ui/SuccessAnimated'
import { Button } from '@shared/ui/Button'
import { useAppDispatch } from '@shared/lib/redux-hooks'
import { closeAuth } from '@modules/auth/model/authSlice'
import Link from 'next/link'
import { useTransition, animated } from '@react-spring/web'

interface Props {
  show: boolean
  title: string
  description: string
}

function SuccessAuth({title, description, show}: Props) {
  const dispatch = useAppDispatch()

  const transitions = useTransition(show, {
    from: {opacity: 0, x: 100},
    enter: {opacity: 1, x: 0},
    leave: {opacity: 0, x: 100},
  })

  return transitions((style, show) => show && (
    <animated.div
      style={style}
      className={classes.block}
    >
      <SuccessAnimated/>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.description}>{description}</p>
      <div className={classes.buttons}>
        <Button
          buttonSize="large"
          fullWidth
          className={classes.toProfile}
          tag={Link}
          href="/profile"
          onClick={() => dispatch(closeAuth())}
        >
          Личный кабинет
        </Button>
        <Button
          buttonSize="large"
          fullWidth
          theme="primaryOutline"
          className={classes.close}
          onClick={() => dispatch(closeAuth())}
        >
          Закрыть
        </Button>
      </div>
    </animated.div>
  ))
}

export { SuccessAuth }