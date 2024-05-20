import { Favorites } from '@modules/favorite'
import { favoritesPageMetadata } from '@shared/consts/seo/metadata'

export const metadata = favoritesPageMetadata

function Page() {
  return <Favorites/>
}

export default Page