import { authViewType } from '@modules/auth/lib/authViewType'

export const getAuthSuccessText = (view: authViewType) => {
  const title: { [key: string]: string } = {
    loginSuccess: 'Успешно авторизовано',
    registerSuccess: 'Успешная регистрация',
  }
  const description: { [key: string]: string } = {
    loginSuccess: 'Для продолжения закройте модальное окно или перейдите в личный кабинет',
    registerSuccess: 'Для продолжения закройте модальное окно или перейдите в личный кабинет',
  }

  return {
    title: title[view],
    description: description[view],
  }
}