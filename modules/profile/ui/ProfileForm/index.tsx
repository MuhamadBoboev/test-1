'use client'
import classes from './profile-form.module.scss'
import { Input } from '@shared/ui/Input'
import {
  FieldErrors,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister, UseFormReset, UseFormSetValue,
  UseFormWatch
} from 'react-hook-form'
import { UpdateProfileFormData } from '@modules/profile/model/UpdateProfileFormData'
import { loginInputHandler, Otp, setUserData, validateLogin } from '@modules/auth'
import { useCallback, useEffect, useState } from 'react'
import { FetchStatus } from '@shared/interfaces/fetchStatus'
import { checkDisableSendCode } from '@modules/auth/lib/checkDisableSendCode'
import { Alert } from '@shared/ui/Alert'
import { ChangeInputButton } from '@modules/profile/ui/ChangeInputButton'
import { Button } from '@shared/ui/Button'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import { changeProfile } from '@modules/profile/api/changeProfile'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import toast from 'react-hot-toast'
import { removeSpaces } from '@shared/lib/removeSpaces'

interface Props {
  register: UseFormRegister<UpdateProfileFormData>
  errors: FieldErrors<UpdateProfileFormData>
  watch: UseFormWatch<UpdateProfileFormData>
  getValues: UseFormGetValues<UpdateProfileFormData>
  handleSubmit: UseFormHandleSubmit<UpdateProfileFormData>
  setValue: UseFormSetValue<UpdateProfileFormData>
}

function ProfileForm({register, errors, watch, getValues, handleSubmit, setValue}: Props) {
  const token = useAppSelector(state => state.auth.token)!
  const {user} = useAppSelector(state => state.auth)
  const [submitStatus, setSubmitStatus] = useState<FetchStatus>('normal')
  const dispatch = useAppDispatch()
  const [inputsDisabled, setInputsDisabled] = useState<{ [key: string]: boolean }>({
    name: true,
    phone: true,
    address: true,
  })
  const [otpFetchStatus, setOtpFetchStatus] = useState<FetchStatus>('normal')
  const [errorMessage, setErrorMessage] = useState('')

  const isDisableSendCode = useCallback(() => {
    return checkDisableSendCode(getValues('phone'))
  }, [watch('phone')])

  useEffect(() => {
    setErrorMessage('')
  }, [watch('phone'), watch('otp')])

  const isFormChangeable = Object.keys(inputsDisabled).some(key => !inputsDisabled[key])

  const isShowOtp = removeSpaces(watch('phone')) !== user?.phone

  const handleChangeInput = (key: 'name' | 'phone' | 'address') => {
    return () => setInputsDisabled({
      ...inputsDisabled,
      [key]: false,
    })
  }

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    setSubmitStatus('pending')
    const response = await changeProfile({token, data})
    if (!response.success) {
      setSubmitStatus('rejected')
      setErrorMessage(response.message)
      return
    }
    dispatch(setUserData(response.user))
    setErrorMessage('')
    toast.success(response.message)
    setSubmitStatus('fulfilled')
    setInputsDisabled({
      name: true,
      phone: true,
      address: true,
    })
    // @ts-ignore
    setValue('otp', '')
  }

  const submitContent = {
    normal: 'Отправить',
    pending: (
      <BarLoader
        color="#fff"
        width={20}
        height={20}
        size={3}
      />
    ),
    fulfilled: 'Отправить',
    rejected: 'Отправить',
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {!!errorMessage && <Alert type="danger">{errorMessage}</Alert>}
      <div className={classes.inputGroup}>
        <Input
          data-id="input-name"
          label="Имя *"
          groupProps={{className: classes.inputGroup}}
          disabled={inputsDisabled['name']}
          {...register('name', {
            required: 'Введите ваше имя',
          })}
          errorMessage={errors.name?.message}
        />
        {inputsDisabled['name'] && (
          <ChangeInputButton
            inputId="input-name"
            onClick={handleChangeInput('name')}
          />
        )}
      </div>
      <div className={classes.inputGroup}>
        <Input
          data-id="input-phone"
          label="Номер телефона *"
          groupProps={{className: classes.inputGroup}}
          disabled={inputsDisabled['phone']}
          {...register('phone', {
            required: 'Введите ваш номер телефона',
            onChange: loginInputHandler,
            validate: validateLogin,
          })}
          errorMessage={errors.phone?.message}
        />
        {inputsDisabled['phone'] && (
          <ChangeInputButton
            inputId="input-phone"
            onClick={handleChangeInput('phone')}
          />)}
      </div>
      {isShowOtp && <div className={classes.inputGroup}>
        <Otp
          register={register}
          otpFetchStatus={otpFetchStatus}
          setOtpFetchStatus={setOtpFetchStatus}
          errorMessage={errors.otp?.message}
          disabled={!isDisableSendCode() || otpFetchStatus === 'pending'}
          value={getValues('phone')}
        />
      </div>}
      <div className={classes.inputGroup}>
        <Input
          data-id="input-address"
          label="Адрес"
          groupProps={{className: classes.inputGroup}}
          disabled={inputsDisabled['address']}
          {...register('address', {
            required: false,
          })}
          errorMessage={errors.address?.message}
        />
        {inputsDisabled['address'] && (
          <ChangeInputButton
            inputId="input-address"
            onClick={handleChangeInput('address')}
          />
        )}
      </div>
      {isFormChangeable && <Button
        className={classes.submit}
        type="submit"
        fullWidth
        buttonSize="large"
      >
        {submitContent[submitStatus]}
      </Button>}
    </form>
  )
}

export { ProfileForm }