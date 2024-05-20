import { RegisterOptions } from 'react-hook-form'
import { checkPassword } from '@shared/lib/checkPassword'

export const passwordInputRegisterOption = (isRequired: boolean, props?: RegisterOptions<any>, requiredMessage = 'Введите ваш пароль'): RegisterOptions<any> => {
  return {
    required: isRequired ? requiredMessage : false,
    validate: checkPassword,
    ...props,
  }
}