'use client'
import classes from './otp.module.scss'
import { Button } from '@shared/ui/Button'
import { sendOtp } from '@modules/auth/api/sendOtp'
import toast from 'react-hot-toast'
import { Input } from '@shared/ui/Input'
import { otpInputRegisterOption } from '@modules/auth/lib/otpInputRegisterOption'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FetchStatus } from '@shared/interfaces/fetchStatus'
import { UseFormRegister } from 'react-hook-form'

interface Props {
  disabled: boolean
  otpFetchStatus: FetchStatus
  setOtpFetchStatus: Dispatch<SetStateAction<FetchStatus>>
  errorMessage?: string
  register: UseFormRegister<any>
  value?: string
}

function Otp({otpFetchStatus, setOtpFetchStatus, disabled, errorMessage, register, value}: Props) {
  const [timer, setTimer] = useState(15)
  const [isTimerShow, setIsTimerShow] = useState(false)
  const sendOtpContent = {
    normal: 'Получить код',
    pending: (
      <BarLoader
        color="#FE7100"
        width={20}
        height={20}
        size={3}
      />
    ),
    fulfilled: 'Получить код',
    rejected: 'Получить код'
  }

  useEffect(() => {
    let time: ReturnType<typeof setTimeout>
    if (isTimerShow) {
      if (timer >= 1) {
        time = setTimeout(() => {
          setTimer(timer - 1)
        }, 1000)
      } else {
        setIsTimerShow(false)
        setTimer(30)
      }
    }

    return () => {
      clearTimeout(time)
    }
  }, [isTimerShow, timer])

  return (
    <div className={classes.phoneConfirmation}>
      <div className={classes.sendCodeWrap}>
        <Button
          className={classes.sendCode}
          type="button"
          theme="primaryOutline"
          buttonSize="large"
          disabled={disabled || isTimerShow}
          fullWidth
          onClick={async () => {
            setOtpFetchStatus('pending')
            const {message, success} = await sendOtp(value || '')
            toast[success ? 'success' : 'error'](message)
            if (success) {
              setIsTimerShow(true)
            }
            setOtpFetchStatus(success ? 'fulfilled' : 'rejected')
          }}
        >
          {sendOtpContent[otpFetchStatus]}
        </Button>
        {isTimerShow && <small className={classes.info}>
          Отправить код повторно можно через {timer}
        </small>}
      </div>
      <Input
        groupProps={{className: classes.codeInput}}
        type="number"
        label="Код *"
        errorMessage={errorMessage}
        maxLength={4}
        minLength={4}
        min={1}
        {...register('otp', otpInputRegisterOption(true))}
      />
    </div>
  )
}

export { Otp }