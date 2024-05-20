
// инициализация корзины в localStorage
export function initCartLocalStorage() {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', '{}')
  }
}