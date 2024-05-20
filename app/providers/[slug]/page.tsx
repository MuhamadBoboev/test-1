import { Provider, getProvider } from '@modules/provider'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { removeTags } from '@shared/lib/removeTags'

export async function generateMetadata({params: {slug}}: { params: { slug: string } }): Promise<Metadata> {
  try {
    const provider = await getProvider(slug)
    return {
      title: `${provider?.name} | PRO Mebel`,
      description: removeTags(provider?.description || '').slice(0, 255).concat('...')
    }
  } catch (e) {
    return {}
  }
}

async function Page({params: {slug}}: { params: { slug: string } }) {
  const provider = await getProvider(slug)
  if (!provider) {
    notFound()
  }

  return <Provider provider={provider}/>
}

export default Page