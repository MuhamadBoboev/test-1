'use client'
import classes from './carousel.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { ProductCard } from '@modules/product'
import { HandySvg } from 'handy-svg'
import 'swiper/css'
import { IProduct } from '@modules/product/model/IProduct'
import { hideNavsSwiper } from '@shared/lib/hideNavsSwiper'

interface Props {
  name: string
  products: IProduct[]
}

function Carousel({products, name}: Props) {
  const paginationId = `${name}-carousel-pagination`
  const nextId = `${name}-carousel-next`
  const prevId = `${name}-carousel-prev`

  return (
    <div className={classes.carousel}>
      <Swiper
        className={classes.swiper}
        slidesPerView={2}
        spaceBetween={16}
        breakpoints={{
          480: {
            spaceBetween: 26,
            slidesPerView: 2,
          },
          769: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 28,
          },
          // 1360: {
          //   slidesPerView: 4,
          //   spaceBetween: 48,
          // },
          1360: {
            slidesPerView: 5,
            spaceBetween: 24,
          }
        }}
        modules={[Pagination, Navigation]}
        navigation={{
          enabled: true,
          nextEl: `#${nextId}`,
          prevEl: `#${prevId}`,
        }}
        pagination={{
          enabled: true,
          bulletClass: classes.bullet,
          bulletActiveClass: classes.bulletActive,
          el: `#${paginationId}`,
          clickable: true,
        }}
        onResize={hideNavsSwiper}
        onAfterInit={hideNavsSwiper}
      >
        {products.map(product => (
          <SwiperSlide
            key={product.id}
            className={classes.slide}
          >
            <ProductCard
              className={classes.card}
              {...product}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={classes.bottom}>
        <div className={classes.pagination} id={paginationId}/>
        <div className={classes.nav}>
          <button
            id={prevId}
            className={classes.prev}
            aria-label="Предыдущий слайд"
          >
            <HandySvg
              src="/assets/icons/arrow-circle-left.svg"
              width={32}
              height={32}
            />
          </button>
          <button
            id={nextId}
            className={classes.next}
            aria-label="Следующий слайд"
          >
            <HandySvg
              src="/assets/icons/arrow-circle-right.svg"
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export { Carousel }