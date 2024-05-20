'use client'
import classes from './product-images.module.scss'
import { IProductImage } from '@modules/product/model/IProductImage'
import { useState } from 'react'
import Image from 'next/image'
import { ProductImagesModal } from '@modules/product/ui/ProductImagesModal'

interface Props {
  productName: string
  image: string
  images: IProductImage[]
}

function ProductImages({ productName, image, images }: Props) {
  const [activeSlide, setActiveSlide] = useState<number | null>(null)

  return (
    <div className={classes.images}>
      <ProductImagesModal
        activeSlide={activeSlide || 0}
        image={image}
        images={images}
        close={() => setActiveSlide(null)}
        open={activeSlide !== null}
      />
      <div className={classes.mainImg}>
        {image ? (
          <Image
            src={image}
            alt={productName}
            width={600}
            height={600}
            onClick={() => setActiveSlide(0)}
          />
        ) : (
          <Image
            src="/assets/icons/doesnеOpen.svg"
            alt="dosnetOpen"
            width={600}
            height={600}
            onClick={() => setActiveSlide(0)}
          />
        )}
      </div>
      <ul className={classes.list}>
        {images.map(({ id, title, image }, index) => (
          <li key={id} className={classes.item}>
            <Image
              className={classes.img}
              src={image}
              alt={title || ''}
              width={107}
              height={107}
              onClick={() => setActiveSlide(index + 1)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export { ProductImages }
