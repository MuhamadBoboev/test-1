import classes from './change-password-form.module.scss'
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset
} from 'react-hook-form'
import { UpdatePasswordFormData } from '@modules/profile/model/UpdatePasswordFormData'
import { Alert } from '@shared/ui/Alert'
import { useState } from 'react'
import { InputPassword } from '@shared/ui/InputPassword'
import { passwordInputRegisterOption } from '@modules/auth/lib/passwordInputRegisterOption'
import { UpdateProfileFormData } from '@modules/profile/model/UpdateProfileFormData'
import { Button } from '@shared/ui/Button'
import { FetchStatus } from '@shared/interfaces/fetchStatus'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import { changePassword } from '@modules/profile/api/changePassword'
import { useAppSelector } from '@shared/lib/redux-hooks'
import toast from 'react-hot-toast'

interface Props {
  close(): void
}

function ChangePasswordForm({close}: Props) {
  const token = useAppSelector(state => state.auth.token)!
  const [submitStatus, setSubmitStatus] = useState<FetchStatus>('normal')
  const [errorMessage, setErrorMessage] = useState('')
  const {
    formState: {errors},
    register,
    handleSubmit,
    reset,
  } = useForm<UpdatePasswordFormData>({
    mode: 'onSubmit',
  })

  const onSubmit: SubmitHandler<UpdatePasswordFormData> = async (data) => {
    setSubmitStatus('pending')
    const response = await changePassword({token, data})
    if (!response.success) {
      setSubmitStatus('rejected')
      setErrorMessage(response.message)
      return
    }
    reset({
      old_password: '',
      password: '',
      password_confirmation: '',
    })
    setSubmitStatus('fulfilled')
    close()
    toast.success(response.message)
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
    <form
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {!!errorMessage && <Alert type="danger">{errorMessage}</Alert>}
      <InputPassword
        label="Старый пароль"
        groupProps={{className: classes.inputGroup}}
        errorMessage={errors.old_password?.message}
        {...register('old_password', passwordInputRegisterOption(true, {}, 'Введите ваш старый пароль'))}
      />
      <InputPassword
        label="Новый пароль"
        groupProps={{className: classes.inputGroup}}
        errorMessage={errors.password?.message}
        {...register('password', passwordInputRegisterOption(true, {}, 'Введите новый пароль'))}
      />
      <InputPassword
        label="Повторите пароль"
        groupProps={{className: classes.inputGroup}}
        errorMessage={errors.password_confirmation?.message}
        {...register('password_confirmation', passwordInputRegisterOption(true, {}, 'Введите подтверждение пароля'))}
      />
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
        {submitContent[submitStatus]}
      </Button>
    </form>
  )
}

export { ChangePasswordForm }