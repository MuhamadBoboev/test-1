import classes from './main-slide.module.scss'
import Image from 'next/image'
import { Button } from '@shared/ui/Button'
import Link from 'next/link'
import { IBanner } from '@shared/interfaces/IBanner'

function MainSlide({image, description, button_text, link, title}: IBanner) {
  return (
    <div className={classes.slide}>
      <Image
        className={classes.img}
        src={image}
        alt={title}
        width={912}
        height={484}
        priority
      />
      <div className={classes.info}>
        <h2 className={classes.title}>{title}</h2>
        <p className={classes.description}>{description}</p>
        {(button_text !== null && link !== null) && (
          <Button
            tag={Link}
            href={link}
            className={classes.link}
            buttonSize="moreButton"
            theme="lightOutline"
          >
            {button_text}
          </Button>
        )}
      </div>
    </div>
  )
}

export { MainSlide }