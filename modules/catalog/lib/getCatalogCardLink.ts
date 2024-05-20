interface Props {
  slug: string
  subcategoryLength: number
}

export function getCatalogCardLink({
                                     subcategoryLength,
                                     slug
                                   }: Props) {
  return subcategoryLength === 0 ? `/category/${slug}/providers/` : `/catalog/${slug}`
}