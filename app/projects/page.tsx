import { SwrProvider } from '@config/providers/SWRProvider'
import { projectsPageMetadata } from '@shared/consts/seo/metadata'
import { Projects } from '@modules/project'

export const metadata = projectsPageMetadata

function Page() {

  return (
    <SwrProvider>
      <Projects/>
    </SwrProvider>
  )
}

export default Page