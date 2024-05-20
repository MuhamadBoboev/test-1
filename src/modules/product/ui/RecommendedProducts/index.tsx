import classes from './recommended-products.module.scss'
import { Section } from '@shared/ui/Section'
import { Carousel } from '@shared/ui/Carousel'
import { IProduct } from '@modules/product/model/IProduct'

interface Props {
  products: IProduct[]
}

function RecommendedProducts({products}: Props) {

  if (!products.length) {
    return null
  }

  return (
    <Section name="Хиты">
      <div className={classes.block}>
        <Carousel
          name="recommended-products"
          products={products}
        />
      </div>
    </Section>
  )
}

export { RecommendedProducts }