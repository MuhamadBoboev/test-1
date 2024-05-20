import classes from './login.module.scss'
import { LoginForm } from '@modules/auth/ui/LoginForm'
import { Dispatch, SetStateAction } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { authViewType } from '@modules/auth/lib/authViewType'

interface Props {
  show: boolean
  changeAuthView: Dispatch<SetStateAction<authViewType>>

  changeAuthMethod(type: 'login' | 'register'): void
}

function Login({show, changeAuthView, changeAuthMethod}: Props) {
  const transitions = useTransition(show, {
    from: {opacity: 0, x: -100},
    enter: {opacity: 1, x: 0},
    leave: {
      opacity: 0,
      x: -100,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 102,
    },
  })

  return transitions((style, show) => show && (
    <animated.div
      style={style}
      className={classes.login}
    >
      <h2 className={classes.title}>Вход</h2>
      <LoginForm changeAuthView={changeAuthView}/>
      <div className={classes.bottom}>
        <p className={classes.registerText}>
          Нет аккаунта?&nbsp;
          <button
            className={classes.register}
            onClick={() => changeAuthMethod('register')}
          >
            Зарегистрируйтесь
          </button>
        </p>
      </div>
    </animated.div>
  ))
}

export { Login }