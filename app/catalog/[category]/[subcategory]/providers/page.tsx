import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SubcategoryProviders, getSubcategoryProviders } from '@modules/catalog'
import { removeTags } from '@shared/lib/removeTags'

interface PageProps {
  params: {
    category: string
    subcategory: string
  }
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  try {
    const subcategory = await getSubcategoryProviders(params.subcategory)
    return {
      title: `Поставщики ${subcategory?.name} | PRO Mebel`,
      description: removeTags(subcategory?.description || '').slice(0, 255).concat('...')
    }
  } catch (e) {
    return {}
  }
}

async function Page({params: {subcategory: subcategorySlug}}: PageProps) {
  const subcategory = await getSubcategoryProviders(subcategorySlug)

  if (!subcategory) {
    notFound()
  }

  return (
    <SubcategoryProviders subcategoryProviders={subcategory}/>
  )
}

export default Page