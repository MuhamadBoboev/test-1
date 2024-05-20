import { notFound } from 'next/navigation'
import { CategoryProviders, getCategoryProviders } from '@modules/catalog'
import { Metadata } from 'next'
import { removeTags } from '@shared/lib/removeTags'

interface PageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  try {
    const category = await getCategoryProviders(params.category)
    return {
      title: `Поставщики ${category?.name} | PRO Mebel`,
      description: removeTags(category?.description || '').slice(0, 255).concat('...')
    }
  } catch (e) {
    return {}
  }
}

async function Page({params: {category: slug}}: PageProps) {
  const category = await getCategoryProviders(slug)

  if (!category) {
    notFound()
  }

  return (
    <CategoryProviders categoryProviders={category}/>
  )
}

export default Page