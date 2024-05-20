import { getSpecialist, Specialist } from '@modules/specialists'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { removeTags } from '@shared/lib/removeTags'

export async function generateMetadata({params: {slug}}: { params: { slug: string } }): Promise<Metadata> {
  try {
    const specialist = await getSpecialist(slug)
    return {
      title: `Специалист ${specialist?.name} | PRO Mebel`,
      description: removeTags(specialist?.description || '').slice(0, 255).concat('...')
    }
  } catch (e) {
    return {}
  }
}

async function Page({params: {slug}}: { params: { slug: string } }) {
  const specialist = await getSpecialist(slug)

  if (!specialist) {
    notFound()
  }
  return <Specialist specialist={specialist}/>
}

export default Page