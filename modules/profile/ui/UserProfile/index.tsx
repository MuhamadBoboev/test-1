'use client'
import classes from './user-profile.module.scss'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { ProfileForm } from '@modules/profile/ui/ProfileForm'
import { useForm } from 'react-hook-form'
import { UpdateProfileFormData } from '@modules/profile/model/UpdateProfileFormData'
import { Button } from '@shared/ui/Button'
import { logout } from '@modules/auth'
import { useRouter } from 'next/navigation'
import { normalizePhoneNumber } from '@shared/lib/normalizePhoneNumber'
import { clearFavoriteProducts } from '@modules/favorite'

interface Props {
  openChangePassword(): void
}

function UserProfile({openChangePassword}: Props) {
  const dispatch = useAppDispatch()
  const {user, token} = useAppSelector(state => state.auth)
  const router = useRouter()
  const {
    formState: {errors},
    register,
    watch,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<UpdateProfileFormData>({
    mode: 'onSubmit',
    defaultValues: {
      name: user?.name,
      phone: normalizePhoneNumber(user?.phone || '') || undefined,
      address: user?.address || undefined,
    }
  })

  return (
    <section className={classes.userProfile}>
      <h2 className={classes.title}>Профиль</h2>
      <ProfileForm
        register={register}
        errors={errors}
        watch={watch}
        getValues={getValues}
        handleSubmit={handleSubmit}
        setValue={setValue}
      />
      <div className={classes.buttons}>
        <Button
          className={classes.changePassword}
          theme="primaryOutline"
          buttonSize="large"
          onClick={openChangePassword}
          fullWidth
        >
          Изменить пароль
        </Button>
        <Button
          className={classes.logout}
          theme="primary"
          buttonSize="large"
          fullWidth
          onClick={() => {
            dispatch(logout(token || ''))
            dispatch(clearFavoriteProducts())
            router.push('/')
          }}
        >
          Выйти из аккаунта
        </Button>
      </div>
    </section>
  )
}

export { UserProfile }