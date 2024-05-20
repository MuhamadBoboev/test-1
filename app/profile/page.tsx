import { ProfileProvider } from '@modules/profile'
import { profilePageMetadata } from '@shared/consts/seo/metadata'

export const metadata = profilePageMetadata

function Page() {
  return <ProfileProvider/>
}

export default Page