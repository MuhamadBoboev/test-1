import { Services } from '@modules/service'
import { servicesPageMetadata } from '@shared/consts/seo/metadata'

export const metadata = servicesPageMetadata

function Page() {
  return <Services/>
}

export default Page