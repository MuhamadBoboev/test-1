import { MainScreen } from '@widgets/MainScreen/ui'
import { QuickLinks } from '@widgets/QuickLinks/ui'
import { getProducts, NewProducts, RecommendedProducts } from '@modules/product'
import { Banners } from '@shared/ui/Banners'
import { MainProviders, getProviders } from '@modules/provider'
import { getCatalog } from '@modules/catalog'
import { getBannersByType } from '@shared/api/getBannersByType'
import { mainPageMetadata } from '@shared/consts/seo/metadata'

export const metadata = mainPageMetadata

async function Page() {
  const catalog = await getCatalog()
  const mainSlides = await getBannersByType()
  const secondarySlides = await getBannersByType('secondary')
  const tertiarySlides = await getBannersByType('tertiary')
  const providers = await getProviders()
  const newProducts = await getProducts('?product_type=new&filter_quantity=1&filter_active=1')
  const recommendedProducts = await getProducts('?product_type=hit&filter_quantity=1&filter_active=1')

  return (
    <>
      <MainScreen
        slides={mainSlides}
        categories={catalog}
      />
      <QuickLinks/>
      <NewProducts products={newProducts?.data || []}/>
      <Banners
        slot1={secondarySlides && secondarySlides[0]}
        slot2={secondarySlides && secondarySlides[1]}
      />
      <RecommendedProducts products={recommendedProducts?.data || []}/>
      <MainProviders providers={providers}/>
      <Banners
        slot1={tertiarySlides && tertiarySlides[0]}
        slot2={tertiarySlides && tertiarySlides[1]}
      />
    </>
  )
}

export default Page