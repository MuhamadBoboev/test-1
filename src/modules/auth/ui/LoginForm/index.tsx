import classes from './login-form.module.scss'
import { Input } from '@shared/ui/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormData } from '@modules/auth/model/LoginFormData'
import { validateLogin } from '@modules/auth/lib/validateLogin'
import { loginInputHandler } from '@modules/auth/lib/loginInputHandler'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FetchStatus } from '@shared/interfaces/fetchStatus'
import { Button } from '@shared/ui/Button'
import { InputPassword } from '@shared/ui/InputPassword'
import { passwordInputRegisterOption } from '@modules/auth/lib/passwordInputRegisterOption'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import { Alert } from '@shared/ui/Alert'
import { Otp } from '@modules/auth/ui/Otp'
import { checkDisableSendCode } from '@modules/auth/lib/checkDisableSendCode'
import { loginRequest } from '@modules/auth/api/loginRequest'
import { storeTokenToLocalStorage } from '@modules/auth/lib/storeTokenToLocalStorage'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { closeAuth, setAuthLink, setToken, setUserData } from '@modules/auth/model/authSlice'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { authViewType } from '@modules/auth/lib/authViewType'

interface Props {
  changeAuthView: Dispatch<SetStateAction<authViewType>>
}

function LoginForm({changeAuthView}: Props) {
  const [loginMethod, setLoginMethod] = useState<'byPhone' | 'byPassword'>('byPassword')
  const [otpFetchStatus, setOtpFetchStatus] = useState<FetchStatus>('normal')
  const [submitStatus, setSubmitStatus] = useState<FetchStatus>('normal')
  const [errorMessage, setErrorMessage] = useState('')
  const {url} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    formState: {errors},
    register,
    handleSubmit,
    watch,
    getValues,
  } = useForm<LoginFormData>({
    mode: 'onSubmit',
  })

  const changeMethodLabel = {
    byPhone: 'Вход по паролю',
    byPassword: 'Вход по номеру телефона'
  }

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 'byPhone' ? 'byPassword' : 'byPhone')
  }

  const isDisableSendCode = () => checkDisableSendCode(getValues('phone'))

  useEffect(() => {
    setErrorMessage('')
  }, [watch('phone'), watch('password'), watch('otp')])

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setSubmitStatus('pending')
    const response = await loginRequest({data, loginMethod})

    // error
    if (!response.success) {
      setSubmitStatus('rejected')
      setErrorMessage(response.message)
      return
    }
    if (response.token && response.user) {
      storeTokenToLocalStorage(response.token)
      dispatch(setToken(response.token))
      dispatch(setUserData(response.user))

      if (url) {
        toast.success(response.message)
        dispatch(closeAuth())
        router.push(url)
        dispatch(setAuthLink(null))
        return
      }
    }
    setSubmitStatus('fulfilled')
    changeAuthView('loginSuccess')
  }

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {!!errorMessage && <Alert type="danger">{errorMessage}</Alert>}
      <Input
        label="Номер телефона"
        groupProps={{className: classes.inputGroup}}
        {...register('phone', {
          required: 'Введите ваш номер телефона',
          onChange: loginInputHandler,
          validate: validateLogin,
        })}
        errorMessage={errors.phone?.message}
      />
      {loginMethod === 'byPhone' && (
        <Otp
          register={register}
          otpFetchStatus={otpFetchStatus}
          setOtpFetchStatus={setOtpFetchStatus}
          errorMessage={errors.otp?.message}
          disabled={!isDisableSendCode() || otpFetchStatus === 'pending'}
          value={getValues('phone')}
        />
      )}
      {loginMethod === 'byPassword' && (
        <InputPassword
          label="Пароль"
          groupProps={{className: classes.inputGroup}}
          errorMessage={errors.password?.message}
          {...register('password', passwordInputRegisterOption(loginMethod === 'byPassword'))}
        />
      )}
      <Button
        type="submit"
        fullWidth
        buttonSize="large"
        className={classes.submit}
        onClick={(event) => {
          if (submitStatus === 'pending') {
            event.preventDefault()
          }
        }}
      >
        {submitStatus === 'pending' && (
          <BarLoader
            color="#fff"
            width={20}
            height={20}
            size={3}
          />
        )}
        {submitStatus !== 'pending' && 'Отправить'}
      </Button>
      <Button
        type="button"
        fullWidth
        buttonSize="large"
        className={classes.changeLoginMethod}
        onClick={toggleLoginMethod}
      >
        {changeMethodLabel[loginMethod]}
      </Button>
    </form>
  )
}

export { LoginForm }