import { normalizePhoneNumber } from '@shared/lib/normalizePhoneNumber'

export function loginInputHandler(event: InputEvent) {
  const target = event.target as HTMLInputElement
  if (target.value.startsWith('+992')) {
    target.value = normalizePhoneNumber(target.value)
  }
}