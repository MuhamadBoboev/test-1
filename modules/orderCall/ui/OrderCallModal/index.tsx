'use client'
import classes from './order-call-modal.module.scss'
import { Modal } from '@shared/ui/Modal'
import { closeOrderCall } from '@modules/orderCall/model/orderCallSlice'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { OrderCallForm } from '@modules/orderCall/ui/OrderCallForm'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { SuccessRequest } from '@modules/orderCall/ui/SuccessRequest'

function OrderCallModal() {
  const {isOpen} = useAppSelector(state => state.orderCall)
  const [isSuccess, setIsSuccess] = useState(false)
  const dispatch = useAppDispatch()
  const transitions = useTransition(!isSuccess, {
    from: {opacity: 0, x: -100},
    enter: {opacity: 1, x: 0},
    leave: {opacity: 0, x: -100, position: 'absolute', left: 0, right: 0, top: 102},
  })

  useEffect(() => {
    let time: ReturnType<typeof setTimeout>
    if (!isOpen) {
      time = setTimeout(() => {
        setIsSuccess(false)
      }, 300)
    }

    return () => {
      clearTimeout(time)
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      close={() => dispatch(closeOrderCall())}
    >
      {!isSuccess && transitions((style, isOpen) => isOpen && (
        <animated.div
          style={style}
          className={classes.orderCall}
        >
          <Image
            className={classes.logo}
            src="/assets/img/logo.svg"
            alt="PRO MEBEL"
            width={190}
            height={62}
          />
          <h2 className={classes.title}>Получить консультацию</h2>
          <p className={classes.description}>
            Оставьте свои контакты и наш сотрудник свяжется<br/> с вами в ближайшее время
          </p>
          <OrderCallForm setIsSuccess={setIsSuccess}/>
        </animated.div>
      ))}
      {isSuccess && <SuccessRequest show={isSuccess}/>}
    </Modal>
  )
}

export { OrderCallModal }