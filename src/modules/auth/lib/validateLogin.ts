import { parsePhoneNumber } from 'libphonenumber-js'
import { checkPhoneNumber } from '@shared/lib/checkPhoneNumber'
import { checkEmail } from '@shared/lib/checkEmail'

export function validateLogin(value: string) {
  try {
    const phoneNumber = parsePhoneNumber(value, 'TJ')
    if (!(phoneNumber.country === 'TJ' && checkPhoneNumber(value))) {
      return 'Неверный формат номера телефона'
    }
    if (!value.startsWith('+992')) {
      return 'Номер телефона должен начинаться с +992'
    }
    return true
  } catch (e) {
    return 'Неверный формат номера телефона'
  }
}

export function validateEmailAndPhoneNumber(value: string) {
  try {
    const phoneNumber = parsePhoneNumber(value, 'TJ')
    if (!(phoneNumber.country === 'TJ' && checkPhoneNumber(value))) {
      return 'Неверный формат номера телефона или email'
    }
    if (!value.startsWith('+992')) {
      return 'Номер телефона должен начинаться с +992'
    }
    return true
  } catch (e) {
    if (!checkEmail(value)) {
      return 'Неверный формат номера телефона или email'
    }
    return true
  }
}