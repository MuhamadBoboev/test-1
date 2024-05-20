import { INavbarItem } from '@widgets/Navbar/model/INavbarItem'

export const getNavLinks = (isAuthenticated: boolean): INavbarItem[] => {
  return [
    {
      icon: '/assets/icons/home.svg',
      name: 'Главная',
      link: '/'
    },
    {
      icon: '/assets/icons/cart.svg',
      name: 'Корзина',
      link: '/cart',
    },
    {
      icon: '/assets/icons/catalog.svg',
      name: 'Каталог',
      link: '/products'
    },
    {
      icon: '/assets/icons/partners.svg',
      name: 'Партнёры',
      link: '/providers',
    },
    {
      icon: `/assets/icons/${isAuthenticated ? 'profile' : 'sign-in'}.svg`,
      name: isAuthenticated ? 'Профиль' : 'Вход',
      link: isAuthenticated ? '/profile' : '#login',
    }
  ]
}