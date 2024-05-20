import classes from './project-card.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'

interface Props {
  title: string
  image: string
  slug: string
}

function ProjectCard({title, image, slug}: Props) {
  return (
    <article className={classes.card}>
      <div className={classes.imgWrap}>
        <Image
          className={classes.img}
          src={image}
          alt={title}
          width={624}
          height={438}
          quality={100}
        />
      </div>
      <div className={classes.bottom}>
        <h3 className={classes.title}>{title}</h3>
        <Link
          className={classes.link}
          href={`/projects/${slug}`}
        >
          Посмотреть проект
          <HandySvg
            src="/assets/icons/arrow-right-long.svg"
            width={17}
            height={8}
          />
        </Link>
      </div>
    </article>
  )
}

export { ProjectCard }