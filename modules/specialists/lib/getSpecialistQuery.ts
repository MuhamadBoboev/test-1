export function getSpecialistQuery(page: number, activeId: number) {
  let query = `?per_page=12&page=${page}`
  if (activeId) {
    query += `&category_id=${activeId}`
  }
  return `/specialists${query}`
}