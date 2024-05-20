import classes from './product.module.scss'
import { IProduct } from '@modules/product/model/IProduct'
import { ProductInfo } from '@modules/product/ui/ProductInfo'
import { Wrapper } from '@shared/ui/Wrapper'
import { ProductImages } from '@modules/product/ui/ProductImages'
import { SimilarProducts } from '@modules/product/ui/SimilarProducts'

interface Props {
  product: IProduct
  products: IProduct[]
}

function Product({product, products}: Props) {
  const {id, name, image, images} = product
  return (
    <div className={classes.product}>
      <Wrapper>
        <div className={classes.block}>
          <ProductInfo product={product}/>
          <ProductImages
            image={image}
            productName={name}
            images={images}
          />
        </div>
      </Wrapper>
      <SimilarProducts productId={id} products={products}/>
    </div>
  )
}

export { Product }