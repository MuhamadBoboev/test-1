import { Cart } from '@modules/cart'
import { cartPageMetadata } from '@shared/consts/seo/metadata'

export const metadata = cartPageMetadata

function Page() {
  return <Cart/>
}

export default Page