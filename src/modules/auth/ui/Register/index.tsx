import classes from './register.module.scss'
import { Dispatch, SetStateAction } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { RegisterForm } from '@modules/auth/ui/RegisterForm'
import { authViewType } from '@modules/auth/lib/authViewType'

interface Props {
  show: boolean
  changeAuthView: Dispatch<SetStateAction<authViewType>>

  changeAuthMethod(type: 'login' | 'register'): void
}

function Register({changeAuthMethod, show, changeAuthView}: Props) {
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
      className={classes.register}
    >
      <h2 className={classes.title}>Регистрация</h2>
      <RegisterForm changeAuthView={changeAuthView}/>
      <div className={classes.bottom}>
        <p className={classes.loginText}>
          Есть аккаунт?&nbsp;
          <button
            className={classes.login}
            onClick={() => changeAuthMethod('login')}
          >
            Войдите
          </button>
        </p>
      </div>
    </animated.div>
  ))
}

export { Register }