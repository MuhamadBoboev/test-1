import { Section } from '@shared/ui/Section'
import { Button } from '@shared/ui/Button'
import { Carousel } from '@shared/ui/Carousel'
import { IProduct } from '@modules/product/model/IProduct'
import Link from 'next/link'

interface Props {
  products: IProduct[]
}

function NewProducts({products}: Props) {

  if (!products.length) {
    return null
  }

  return (
    <Section
      name="Новинки"
      buttonMore={(
        <Button
          buttonSize="moreButton"
          theme="primaryOutline"
          tag={Link}
          href="/products?product_type=new"
        >Все новинки</Button>
      )}
    >
      <Carousel
        name="new-products"
        products={products}
      />
    </Section>
  )
}

export { NewProducts }