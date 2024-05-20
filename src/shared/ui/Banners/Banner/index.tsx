import classes from './banner.module.scss'
import { IBanner } from '@shared/interfaces/IBanner'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { Button } from '@shared/ui/Button'

interface Props extends IBanner {
  className?: string
}

function Banner({
  image,
  description,
  button_text,
  link,
  title,
  className,
}: Props) {
  return (
    <div className={clsx(classes.banner, className)}>
      <Image
        className={classes.img}
        src={image}
        alt={title}
        width={624}
        height={400}
      />
      <div className={classes.info}>
        <h2 className={classes.title}>{title}</h2>
        {description && <p className={classes.description}>{description}</p>}
        {button_text !== null && link !== null && (
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

export { Banner }
