import { getSpecialistCategories, Specialists } from '@modules/specialists'
import { SwrProvider } from '@config/providers/SWRProvider'
import { specialistsPageMetadata } from '@shared/consts/seo/metadata'

export const metadata = specialistsPageMetadata

async function Page() {
  const specialistCategories = await getSpecialistCategories()

  if (!specialistCategories) {
    throw new Error('Произошла ошибка')
  }

  return (
    <SwrProvider>
      <Specialists specialistCategories={specialistCategories}/>
    </SwrProvider>
  )
}

export default Page