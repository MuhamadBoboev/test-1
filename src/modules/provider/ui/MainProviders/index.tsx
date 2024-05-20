import { Section } from '@shared/ui/Section'
import { Button } from '@shared/ui/Button'
import Link from 'next/link'
import { IProvider } from '@modules/provider'
import { MainProviderList } from '@modules/provider/ui/MainProviderList'

interface Props {
  providers: IProvider[] | null
}

function MainProviders({providers}: Props) {
  if (!providers || !providers.length) {
    return null
  }

  return (
    <Section
      name="Наши партнёры"
      buttonMore={(
        <Button
          tag={Link}
          href="/providers"
          buttonSize="moreButton"
          theme="primaryOutline"
        >
          Все поставщики
        </Button>
      )}
    >
      <MainProviderList providers={providers.slice(0, 8)}/>
    </Section>
  )
}

export { MainProviders }