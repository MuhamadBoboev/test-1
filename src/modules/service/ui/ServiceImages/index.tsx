'use client'
import classes from './service-images.module.scss'
import { useState } from 'react'
import Image from 'next/image'
import { IServiceImage } from '@modules/service/model/IServiceImage'
import { ServiceImagesModal } from '@modules/service/ui/ServiceImagesModal'

interface Props {
  serviceName: string
  image: string
  images: IServiceImage[]
}

function ServiceImages({serviceName, image, images}: Props) {
  const [activeSlide, setActiveSlide] = useState<number | null>(null)

  return (
    <div className={classes.images}>
      <ServiceImagesModal
        activeSlide={activeSlide || 0}
        image={image}
        images={images}
        close={() => setActiveSlide(null)}
        open={activeSlide !== null}
      />
      <div className={classes.mainImg}>
        <Image
          src={image}
          alt={serviceName}
          width={600}
          height={600}
          onClick={() => setActiveSlide(0)}
        />
      </div>
      {!!images.length && <ul className={classes.list}>
        {images.map(({id, title, image}, index) => (
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
      </ul>}
    </div>
  )
}

export { ServiceImages }