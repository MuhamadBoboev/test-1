export interface IBanner {
  id: number
  title: string
  description: string | null
  image: string
  button_text: string | null
  link: string | null
  order: number | null
  type: BannerType
}

export type BannerType = 'main' | 'secondary' | 'tertiary'