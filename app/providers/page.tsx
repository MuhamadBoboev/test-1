import { Providers, getProviders } from '@modules/provider'
import { providersPageMetadata } from '@shared/consts/seo/metadata'

export const metadata = providersPageMetadata

async function Page() {
  const providers = await getProviders()

  if (!providers) {
    throw new Error('Произошла ошибка')
  }

  return (
    <Providers
      title="Наши поставщики"
      breadcrumbs={[
        {
          label: 'Все поставщики',
          link: '/providers',
          isActive: true,
        }
      ]}
      providers={providers}
    />
  )
}

export default Page