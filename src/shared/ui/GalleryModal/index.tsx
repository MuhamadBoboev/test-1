'use client'
import classes from './gallery-modal.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { HandySvg } from 'handy-svg'
import { IGalleryPicture } from '@shared/interfaces/IGalleryPicture'
import { Navigation, Pagination } from 'swiper/modules'

interface Props {
  open: boolean
  activeId?: number
  pictures: IGalleryPicture[]

  close(): void
}

function GalleryModal({open, close, pictures, activeId}: Props) {
  const paginationId = 'gallery-modal-pagination'
  const prevId = 'gallery-modal-prev'
  const nextId = 'gallery-modal-next'

  if (!open) {
    return null
  }

  return (
    <div className={classes.modal}>
      <div onClick={close} className={classes.backdrop}/>
      <button
        className={classes.close}
        onClick={close}
        aria-label="Закрыть"
      >
        <HandySvg
          src="/assets/icons/close.svg"
          width={24}
          height={24}
        />
      </button>
      <div className={classes.content}>
        <Swiper
          className={classes.swiper}
          modules={[Pagination, Navigation]}
          navigation={{
            enabled: true,
            prevEl: `#${prevId}`,
            nextEl: `#${nextId}`,
          }}
          pagination={{
            enabled: true,
            el: `#${paginationId}`,
            clickable: true,
            bulletClass: classes.bullet,
            bulletActiveClass: classes.bulletActive,
          }}
          initialSlide={activeId}
        >
          {pictures.map(({id, image}) => (
            <SwiperSlide
              key={id}
              className={classes.slide}
              onClick={close}
            >
              <img
                className={classes.img}
                src={image}
                alt=""
                width={1000}
                height={800}
                onClick={(event) => event.stopPropagation()}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div id={paginationId} className={classes.pagination}/>
        <div className={classes.navigation}>
          <button
            id={prevId}
            className={classes.prev}
            aria-label="Пред. изображение"
          >
            <HandySvg
              src="/assets/icons/arrow-left.svg"
              width={48}
              height={48}
            />
          </button>
          <button
            id={nextId}
            className={classes.next}
            aria-label="След. изображение"
          >
            <HandySvg
              src="/assets/icons/arrow-right.svg"
              width={48}
              height={48}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GalleryModal