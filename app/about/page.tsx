import { About } from '@modules/company'
import { aboutPageMetadata } from '@shared/consts/seo/metadata'

export const metadata = aboutPageMetadata

function Page() {
  return <About/>
}

export default Page