import { authSlice, openAuth, closeAuth, toggleAuth, setToken, setUserData, setAuthLink } from '@modules/auth/model/authSlice'
import { logout } from '@modules/auth/lib/logout'
import { AuthModal } from '@modules/auth/ui/AuthModal'
import { IUser } from '@modules/auth/model/IUser'
import { loginInputHandler } from '@modules/auth/lib/loginInputHandler'
import { validateLogin } from '@modules/auth/lib/validateLogin'
import { Otp } from '@modules/auth/ui/Otp'

export { AuthModal, Otp }
export {
  authSlice,
  closeAuth,
  toggleAuth,
  setToken,
  setUserData,
  openAuth,
  setAuthLink,
  logout,
}
export {
  loginInputHandler,
  validateLogin
}
export type { IUser }