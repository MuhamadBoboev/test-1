import { getService, Service } from '@modules/service'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { removeTags } from '@shared/lib/removeTags'

export async function generateMetadata({params: {slug}}: { params: { slug: string } }): Promise<Metadata> {
  try {
    const service = await getService(slug)
    const description = removeTags(service?.description || '')

    return {
      title: `${service?.name} | PRO Mebel`,
      description: description.slice(0, 255).concat('...')
    }
  } catch (e) {
    return {}
  }
}

async function Page({params: {slug}}: { params: { slug: string } }) {
  const service = await getService(slug)

  if (!service) {
    notFound()
  }

  return <Service service={service}/>
}

export default Page