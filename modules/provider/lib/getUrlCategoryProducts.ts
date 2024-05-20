export function getUrlCategoryProducts(categorySlug: string, subcategorySlug?: string) {
  let slug = `/category/${categorySlug}/`
  if (subcategorySlug) {
    slug += `${subcategorySlug}/products`
  } else {
    slug += 'products'
  }
  return slug
}