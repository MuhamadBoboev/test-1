'use client'
import classes from './main-slider.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MainSlide } from '../MainSlide'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import { IBanner } from '@shared/interfaces/IBanner'
import { HandySvg } from 'handy-svg'

interface Props {
  slides: IBanner[] | null
}

function MainSlider({slides}: Props) {
  const paginationId = 'main-slider-pagination'
  const prevId = 'main-slider-nav-prev'
  const nextId = 'main-slider-nav-next'

  if (!slides || !slides.length) {
    return null
  }

  return (
    <section className={classes.banner}>
      <Swiper
        className={classes.slider}
        spaceBetween={16}
        breakpoints={{
          600: {
            spaceBetween: 24,
          },
          1024: {
            spaceBetween: 28,
          },
          1360: {
            spaceBetween: 48,
          }
        }}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{
          enabled: true,
          clickable: true,
          el: `#${paginationId}`,
          bulletClass: classes.bullet,
          bulletActiveClass: classes.bulletActive,
        }}
        navigation={{
          enabled: true,
          prevEl: `#${prevId}`,
          nextEl: `#${nextId}`,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className={classes.slide}
          >
            <MainSlide {...slide}/>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={classes.nav}>
        <button
          id={prevId}
          className={classes.prev}
          aria-label="Предыдущий слайд"
        >
          <HandySvg
            src="/assets/icons/arrow-left.svg"
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
            src="/assets/icons/arrow-right.svg"
            width={32}
            height={32}
          />
        </button>
      </div>
      <div
        id={paginationId}
        className={classes.pagination}
      />
    </section>
  )
}

export { MainSlider }