import { RegisterOptions } from 'react-hook-form'

export const otpInputRegisterOption = (isRequired: boolean, props?: RegisterOptions<any>) => {
  return {
    required: isRequired ? 'Введите проверечный код' : false,
    minLength: {
      value: 4,
      message: 'Длина кода 4 символа'
    },
    maxLength: {
      value: 4,
      message: 'Длина кода 4 символа'
    },
    ...props,
  }
}