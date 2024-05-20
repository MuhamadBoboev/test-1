export function storeTokenToLocalStorage(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token)
  }
}