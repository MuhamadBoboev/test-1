import { getVacancy, Vacancy } from '@modules/vacancy'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { removeTags } from '@shared/lib/removeTags'

export async function generateMetadata({params: {slug}}: { params: { slug: string } }): Promise<Metadata> {
  try {
    const vacancy = await getVacancy(slug)
    return {
      title: `${vacancy?.name} - Вакансия | PRO Mebel`,
      description: vacancy?.short_description || removeTags(vacancy?.description || '')?.slice(0, 255).concat('...')
    }
  } catch (e) {
    return {}
  }
}

async function Page({params: {slug}}: { params: { slug: string } }) {
  const vacancy = await getVacancy(slug)

  if (!vacancy) {
    notFound()
  }

  return <Vacancy vacancy={vacancy} />
}

export default Page