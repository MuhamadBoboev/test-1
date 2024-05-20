'use client'
import classes from './similar-projects.module.scss'
import { IProject } from '@modules/project'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { hideNavsSwiper } from '@shared/lib/hideNavsSwiper'
import { HandySvg } from 'handy-svg'
import { ProjectCard } from '@modules/project/ui/ProjectCard'
import { Section } from '@shared/ui/Section'

interface Props {
  projects?: IProject[]
}

function SimilarProjects({projects}: Props) {

  if (!projects || !projects.length) {
    return null
  }

  const paginationId = 'similar-projects-carousel-pagination'
  const nextId = 'similar-projects-carousel-next'
  const prevId = 'similar-projects-carousel-prev'

  return (
    <Section className={classes.section} name="Похожые проекты">
      <div className={classes.block}>
        <Swiper
          className={classes.swiper}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            480: {
              spaceBetween: 16,
              slidesPerView: 2,
            },
            769: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
            1360: {
              slidesPerView: 3,
              spaceBetween: 48,
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
          {projects.map(product => (
            <SwiperSlide
              key={product.id}
              className={classes.slide}
            >
              <ProjectCard {...product}/>
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
    </Section>
  )
}

export { SimilarProjects }