import { Contacts, getShowrooms } from '@modules/company'
import { contactsPageMetadata } from '@shared/consts/seo/metadata'

export const metadata = contactsPageMetadata

async function Page() {
  const showrooms = await getShowrooms()
  return <Contacts showrooms={showrooms}/>
}

export default Page