import classes from './order-call-form.module.scss'
import { Alert } from '@shared/ui/Alert'
import { Input } from '@shared/ui/Input'
import { loginInputHandler } from '@modules/auth/lib/loginInputHandler'
import { validateLogin } from '@modules/auth/lib/validateLogin'
import { Button } from '@shared/ui/Button'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FetchStatus } from '@shared/interfaces/fetchStatus'
import { SubmitHandler, useForm } from 'react-hook-form'
import { OrderCallFormData } from '@modules/orderCall/model/OrderCallFormData'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import { orderCallRequest } from '@modules/orderCall/api/orderCallRequest'
import { TextArea } from '@shared/ui/TextArea'

interface Props {
  setIsSuccess: Dispatch<SetStateAction<boolean>>
}

function OrderCallForm({setIsSuccess}: Props) {
  const [submitStatus, setSubmitStatus] = useState<FetchStatus>('normal')
  const [errorMessage, setErrorMessage] = useState('')
  const {
    formState: {errors},
    register,
    handleSubmit,
    watch,
  } = useForm<OrderCallFormData>({
    mode: 'onSubmit',
  })

  useEffect(() => {
    setErrorMessage('')
  }, [watch('contact'), watch('name'), watch('comment')])

  const submitContent = {
    normal: 'Отправить заявку',
    pending: (
      <BarLoader
        color="#fff"
        width={20}
        height={20}
        size={3}
      />
    ),
    fulfilled: 'Отправить заявку',
    rejected: 'Отправить заявку',
  }

  const onSubmit: SubmitHandler<OrderCallFormData> = async (data) => {
    setSubmitStatus('pending')
    const status = await orderCallRequest(data)
    setSubmitStatus(status.success ? 'fulfilled' : 'rejected')
    setIsSuccess(status.success)
    setErrorMessage(!status.success ? (status.message || 'Произошла ошибка') : '')
  }

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {!!errorMessage && <Alert type="danger">{errorMessage}</Alert>}
      <Input
        label="Имя *"
        groupProps={{className: classes.inputGroup}}
        {...register('name', {
          required: 'Введите ваше имя',
        })}
        errorMessage={errors.name?.message}
      />
      <Input
        label="Номер телефона или Email *"
        groupProps={{className: classes.inputGroup}}
        {...register('contact', {
          required: 'Введите ваш Email или номер телефона',
          onChange: loginInputHandler,
          validate: validateLogin,
        })}
        errorMessage={errors.contact?.message}
      />
      <TextArea
        label="Ваши комментарии"
        groupProps={{className: classes.inputGroup}}
        {...register('comment')}
        errorMessage={errors.comment?.message}
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

export { OrderCallForm }