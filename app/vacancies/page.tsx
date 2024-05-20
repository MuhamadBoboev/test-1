import { getVacancyCategories, Vacancies } from '@modules/vacancy'
import { SearchParamsType } from '@shared/interfaces/SearchParamsType'
import { SwrProvider } from '@config/providers/SWRProvider'
import { vacanciesPageMetadata } from '@shared/consts/seo/metadata'

export const metadata = vacanciesPageMetadata

async function Page({searchParams}: { searchParams: SearchParamsType }) {
  const vacancyCategories = await getVacancyCategories()

  if (!vacancyCategories) {
    throw new Error()
  }

  return (
    <SwrProvider>
      <Vacancies
        vacancyCategories={vacancyCategories}
        searchParams={searchParams}
      />
    </SwrProvider>
  )
}

export default Page