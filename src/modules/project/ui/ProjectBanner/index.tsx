'use client'
import classes from './project-banner.module.scss'
import Image from 'next/image'
import { Wrapper } from '@shared/ui/Wrapper'
import { useWindowSize } from 'usehooks-ts'

interface Props {
  image: string
  title: string
  shortDescription?: string | null
}

function ProjectBanner({image, title, shortDescription}: Props) {
  const {width} = useWindowSize()

  return (
    <Wrapper className={classes.wrapper}>
      {width <= 768 && <header className={classes.headerMobile}>
        <h1 className={classes.titleMobile}>{title}</h1>
      </header>}
      <section className={classes.banner}>
        <div className={classes.backdrop}/>
        <Image
          className={classes.img}
          src={image}
          alt={title}
          width={1600}
          height={600}
        />
        {width > 768 && <div className={classes.info}>
          <h1 className={classes.title}>{title}</h1>
          <p className={classes.description}>{shortDescription}</p>
        </div>}
      </section>
    </Wrapper>
  )
}

export { ProjectBanner }