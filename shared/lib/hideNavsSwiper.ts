import { Swiper } from 'swiper/types'

const hideNavs = (swiper: Swiper, navId?: string) => {
  if (navId) {
    const element = document.getElementById(navId)
    if (element) {
      element.style.opacity = '0'
      element.style.pointerEvents = 'none'
    }
    return
  }
  if (swiper.pagination.el.parentElement) {
    swiper.pagination.el.parentElement.style.opacity = '0'
    swiper.pagination.el.parentElement.style.pointerEvents = 'none'
  }
}

const showNavs = (swiper: Swiper, navId?: string) => {
  if (navId) {
    const element = document.getElementById(navId)
    if (element) {
      element.style.opacity = '1'
      element.style.pointerEvents = 'auto'
    }
  }
  if (swiper.pagination.el.parentElement) {
    swiper.pagination.el.parentElement.style.opacity = '1'
    swiper.pagination.el.parentElement.style.pointerEvents = 'auto'
  }
}

export function hideNavsSwiper(swiper: Swiper, navId?: string) {
  const breakpoints = swiper.params.breakpoints
  if (breakpoints) {
    if (breakpoints[swiper.currentBreakpoint]) {
      if (breakpoints[swiper.currentBreakpoint].slidesPerView) {
        if (swiper.slides.length <= Number(breakpoints[swiper.currentBreakpoint].slidesPerView)) {
          hideNavs(swiper, navId)
        } else {
          showNavs(swiper, navId)
        }
      }
    } else if (swiper.currentBreakpoint === 'max') {
      if (swiper.slides.length <= Number(swiper.params.slidesPerView)) {
        hideNavs(swiper, navId)
      } else {
        showNavs(swiper, navId)
      }
    }
  }
}