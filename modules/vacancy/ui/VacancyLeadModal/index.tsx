import classes from './vacancy-lead-modal.module.scss'
import { Modal } from '@shared/ui/Modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { VacancyLeadFormData } from '@modules/vacancy/model/VacancyLeadFormData'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import toast from 'react-hot-toast'
import { Input } from '@shared/ui/Input'
import { loginInputHandler, validateLogin } from '@modules/auth'
import { FileUploader } from '@shared/ui/FileUploader'
import { useState } from 'react'
import { Checkbox } from '@shared/ui/Checkbox'
import { Button } from '@shared/ui/Button'
import Image from 'next/image'
import { Alert } from '@shared/ui/Alert'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import { validateEmailAndPhoneNumber } from '@modules/auth/lib/validateLogin'

interface Props {
  vacancyId: number
  isOpen: boolean

  close(): void
}

function VacancyLeadModal({vacancyId, isOpen, close}: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const {
    trigger,
    isMutating,
  } = useSWRMutation('/vacancies/lead', postFetcher)
  const {
    register,
    formState: {errors},
    reset,
    watch,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<VacancyLeadFormData>({
    mode: 'onSubmit',
    defaultValues: {
      vacancy_id: vacancyId,
      accept: false,
    },
  })

  const onSubmit: SubmitHandler<VacancyLeadFormData> = async (data) => {
    try {
      const response = await trigger({
        ...data,
        vacancy_id: vacancyId,
        file,
      })
      reset({
        name: '',
        contact: '',
        accept: false,
        file: '',
      })
      close()
      setErrorMessage('')
      toast.success(response.message)
    } catch (e) {
      setErrorMessage('Произошла ошибка!')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      close={() => {
        setErrorMessage('')
        close()
      }}
    >
      <Image
        className={classes.logo}
        src="/assets/img/logo.svg"
        alt="PRO MEBEL"
        width={190}
        height={62}
      />
      <h2 className={classes.title}>Оставить заявку</h2>
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        {!!errorMessage && <Alert type="danger">{errorMessage}</Alert>}
        <Input
          groupProps={{className: classes.input}}
          label="ФИО *"
          errorMessage={errors.name?.message}
          {...register('name', {
            required: 'Введите ваше имя и фамилию',
            maxLength: {
              value: 255,
              message: 'Максимальная длина 255 символов',
            },
          })}
        />
        <Input
          label="Email или номер телефона *"
          groupProps={{className: classes.input}}
          {...register('contact', {
            required: 'Введите ваш Email или номер телефона',
            onChange: loginInputHandler,
            validate: validateEmailAndPhoneNumber,
          })}
          errorMessage={errors.contact?.message}
        />
        <FileUploader
          groupClassName={classes.input}
          file={file}
          setFile={setFile}
          label="Резюме *.pdf, *.doc, *.docx"
        />
        <Checkbox
          checked={getValues('accept')}
          {...register('accept', {
            required: true,
            onChange: () => {
              setValue('accept', !Boolean(getValues('accept')))
            },
          })}
        >
          Я согласен(-а) на пользовательское соглашение и на обработку моих персональных данных
        </Checkbox>
        <Button
          type="submit"
          fullWidth
          theme="primary"
          className={classes.submit}
          disabled={!watch('accept')}
        >
          {!isMutating && 'Отправить'}
          {isMutating && (
            <BarLoader
              color="#fff"
              width={20}
              height={20}
              size={3}
            />
          )}
        </Button>
      </form>
    </Modal>
  )
}

export { VacancyLeadModal }