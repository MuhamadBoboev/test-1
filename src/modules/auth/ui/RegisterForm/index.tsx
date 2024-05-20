import classes from './register-form.module.scss'
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
import { storeTokenToLocalStorage } from '@modules/auth/lib/storeTokenToLocalStorage'
import { useAppDispatch } from '@shared/lib/redux-hooks'
import { setToken, setUserData } from '@modules/auth/model/authSlice'
import { RegisterFormData } from '@modules/auth/model/RegisterFormData'
import { registerRequest } from '@modules/auth/api/registerRequest'
import { authViewType } from '@modules/auth/lib/authViewType'

interface Props {
	changeAuthView: Dispatch<SetStateAction<authViewType>>
}

function RegisterForm({ changeAuthView }: Props) {
	const [otpFetchStatus, setOtpFetchStatus] = useState<FetchStatus>('normal')
	const [submitStatus, setSubmitStatus] = useState<FetchStatus>('normal')
	const [errorMessage, setErrorMessage] = useState('')
	const dispatch = useAppDispatch()
	const {
		formState: { errors },
		register,
		handleSubmit,
		watch,
		getValues,
	} = useForm<RegisterFormData>({
		mode: 'onChange',
	})

	const isDisableSendCode = () => checkDisableSendCode(getValues('phone'))

	useEffect(() => {
		setErrorMessage('')
	}, [watch('phone'), watch('password'), watch('otp')])

	const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
		setSubmitStatus('pending')
		const response = await registerRequest(data)
		if (!response.success) {
			setSubmitStatus('rejected')
			setErrorMessage(response.message)
			return
		}
		if (response.token && response.user) {
			storeTokenToLocalStorage(response.token)
			dispatch(setToken(response.token))
			dispatch(setUserData(response.user))
		}
		setSubmitStatus('fulfilled')
		changeAuthView('registerSuccess')
	}

	return (
		<form
			className={classes.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			{!!errorMessage && <Alert type="danger">{errorMessage}</Alert>}
			<Input
				label="Имя *"
				groupProps={{ className: classes.inputGroup }}
				{...register('name', {
					required: 'Введите ваше имя',
				})}
				errorMessage={errors.name?.message}
			/>
			<Input
				label="Номер телефона *"
				groupProps={{ className: classes.inputGroup }}
				{...register('phone', {
					required: 'Введите ваш номер телефона',
					onChange: loginInputHandler,
					validate: validateLogin,
				})}
				errorMessage={errors.phone?.message}
			/>
			<Otp
				register={register}
				otpFetchStatus={otpFetchStatus}
				setOtpFetchStatus={setOtpFetchStatus}
				errorMessage={errors.otp?.message}
				disabled={!isDisableSendCode() || otpFetchStatus === 'pending'}
				value={getValues('phone')}
			/>
			<InputPassword
				label="Пароль *"
				groupProps={{ className: classes.inputGroup }}
				errorMessage={errors.password?.message}
				{...register('password', passwordInputRegisterOption(true))}
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
				{submitStatus === 'pending' && (
					<BarLoader
						color="#fff"
						width={20}
						height={20}
						size={3}
					/>
				)}
				{submitStatus !== 'pending' && 'Зарегистрироваться'}
			</Button>
		</form>
	)
}

export { RegisterForm }