import classes from './project-gallery.module.scss'
import { IProjectImage } from '@modules/project/model/IProjectImage'
import Image from 'next/image'

interface Props {
  images: IProjectImage[]
}

function ProjectGallery({images}: Props) {

  if (!images.length) {
    return null
  }

  return (
    <section className={classes.images}>
      <h2 className={classes.title}>Галерея</h2>
      <ul className={classes.list}>
        {images.map(({id, title, image}) => (
          <li key={id} className={classes.item}>
            <Image
              className={classes.img}
              src={image}
              alt={title || ''}
              width={400}
              height={400}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export { ProjectGallery }