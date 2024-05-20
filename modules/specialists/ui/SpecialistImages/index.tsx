'use client'
import classes from './specialist-images.module.scss'
import { ISpecialistImage } from '@modules/specialists/model/ISpecialistImage'
import { useState } from 'react'
import Image from 'next/image'
import { SpecialistImagesModal } from '../SpecialistImagesModal'
import clsx from 'clsx'

interface Props {
  specialistName: string
  images: ISpecialistImage[]
}

function SpecialistImages({specialistName, images}: Props) {
  const [activeSlide, setActiveSlide] = useState<number | null>(null)

  return (
    <div className={clsx(classes.images, images.length === 0 && classes.hide)}>
      <SpecialistImagesModal
        activeSlide={activeSlide || 0}
        images={images}
        close={() => setActiveSlide(null)}
        open={activeSlide !== null}
      />
      {images.length !== 0 && <>
        <div className={classes.mainImg}>
          <Image
            src={images[0].image}
            alt={specialistName}
            width={600}
            height={600}
            onClick={() => setActiveSlide(0)}
          />
        </div>
        <ul className={classes.list}>
          {images.slice(1).map(({id, image}, index) => (
            <li key={id} className={classes.item}>
              <Image
                className={classes.img}
                src={image}
                alt=""
                width={107}
                height={107}
                onClick={() => setActiveSlide(index + 1)}
              />
            </li>
          ))}
        </ul>
      </>}
    </div>
  )
}

export { SpecialistImages }