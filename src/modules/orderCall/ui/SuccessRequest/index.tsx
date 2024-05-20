'use client'
import classes from './success-request.module.scss'
import { SuccessAnimated } from '@shared/ui/SuccessAnimated'
import { Button } from '@shared/ui/Button'
import { useAppDispatch } from '@shared/lib/redux-hooks'
import { useTransition, animated } from '@react-spring/web'
import { closeOrderCall } from '@modules/orderCall/model/orderCallSlice'

interface Props {
  show: boolean
}

function SuccessRequest({show}: Props) {
  const dispatch = useAppDispatch()

  const transitions = useTransition(show, {
    from: {opacity: 0, x: 100},
    enter: {opacity: 1, x: 0},
    leave: {opacity: 0, x: 100},
  })

  return transitions((style, show) => show && (
    <animated.div
      className={classes.block}
      style={style}
    >
      <SuccessAnimated/>
      <h2 className={classes.title}>Заявка успешно отправлено</h2>
      <p className={classes.description}>В ближайшем времени наши менеджера с вами свяжется</p>
      <div className={classes.buttons}>
        <Button
          buttonSize="large"
          fullWidth
          theme="primaryOutline"
          className={classes.close}
          onClick={() => dispatch(closeOrderCall())}
        >
          Закрыть
        </Button>
      </div>
    </animated.div>
  ))
}

export { SuccessRequest }