import { Checkout } from '@modules/checkout'
import { checkoutPageMetadata } from '@shared/consts/seo/metadata'

export const metadata = checkoutPageMetadata

function Page() {
  return <Checkout/>
}

export default Page