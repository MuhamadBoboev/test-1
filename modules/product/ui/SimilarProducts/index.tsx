import classes from './similar-products.module.scss'
import { IProduct } from '@modules/product/model/IProduct'
import { Carousel } from '@shared/ui/Carousel'
import { Section } from '@shared/ui/Section'
import { Wrapper } from '@shared/ui/Wrapper'

interface Props {
  productId: number
  products: IProduct[]
}

function SimilarProducts({productId, products}: Props) {

  if (!products.length) {
    return null
  }

  return (
    <>
      <Wrapper>
        <div className={classes.divider}/>
      </Wrapper>
      <Section className={classes.section} name="Похожая продукция">
        <div className={classes.block}>
          <Carousel
            name="similar-products"
            products={products.filter(product => product.id !== productId)}
          />
        </div>
      </Section>
    </>
  )
}

export { SimilarProducts }