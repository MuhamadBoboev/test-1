import { parsePhoneNumber } from 'libphonenumber-js'
import { checkPhoneNumber } from '@shared/lib/checkPhoneNumber'

export function checkDisableSendCode(contact: string = '1') {
  let isValid: boolean | null = false
  try {
    const phoneNumber = parsePhoneNumber(contact, 'TJ')
    isValid = phoneNumber.country === 'TJ' && checkPhoneNumber(contact) && contact.startsWith('+992')
  } catch (e) {
  }
  return isValid
}