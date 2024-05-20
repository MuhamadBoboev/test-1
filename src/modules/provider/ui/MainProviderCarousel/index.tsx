'use client'
import classes from './main-provider-carousel.module.scss'
import { IProvider } from '@modules/provider'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MainProviderCard } from '@modules/provider/ui/MainProviderCard'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import { hideNavsSwiper } from '@shared/lib/hideNavsSwiper'

interface Props {
  providers: IProvider[]
}

function MainProviderCarousel({providers}: Props) {
  const paginationId = `main-providers-carousel-pagination`

  return (
    <Swiper
      className={classes.swiper}
      slidesPerView={2}
      spaceBetween={16}
      breakpoints={{
        480: {
          spaceBetween: 26,
          slidesPerView: 2,
        },
      }}
      modules={[Pagination]}
      pagination={{
        enabled: true,
        bulletClass: classes.bullet,
        bulletActiveClass: classes.bulletActive,
        el: `#${paginationId}`,
        clickable: true,
      }}
      onAfterInit={(swiper) => hideNavsSwiper(swiper, paginationId)}
      onResize={(swiper) => hideNavsSwiper(swiper, paginationId)}
    >
      {providers.map(({id, name, logo, slug}) => (
        <SwiperSlide
          key={id}
          className={classes.slide}
        >
          <MainProviderCard
            logo={logo}
            name={name}
            slug={slug}
            tag="div"
          />
        </SwiperSlide>
      ))}
      <div className={classes.pagination} id={paginationId}/>
    </Swiper>
  )
}

export { MainProviderCarousel }