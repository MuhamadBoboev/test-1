import { getProducts, getProduct, Product } from '@modules/product'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { removeTags } from '@shared/lib/removeTags'

export async function generateMetadata({params: {slug}}: { params: { slug: string } }): Promise<Metadata> {
  try {
    const product = await getProduct(slug)
    const description = removeTags(product?.description || '')
    return {
      title: `${product?.name} | PRO Mebel`,
      description: description.slice(0, 255).concat('...')
    }
  } catch (e) {
    return {}
  }
}

async function Page({params: {slug}}: { params: { slug: string } }) {
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const products = await getProducts(`?category_id[]=${product.category.id}&filter_quantity=1&filter_active=1`)

  return (
    <Product
      product={product}
      products={products?.data || []}
    />
  )
}

export default Page