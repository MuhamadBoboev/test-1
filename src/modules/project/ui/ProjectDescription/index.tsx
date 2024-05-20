import classes from './project-description.module.scss'
import { removeTags } from '@shared/lib/removeTags'
import { nextLineToBreak } from '@shared/lib/nextLineToBreak'
import HTMLReactParser from 'html-react-parser'
import Image from 'next/image'

interface Props {
  description: string | null
  image?: string
}

function ProjectDescription({description, image}: Props) {
  if (!description) {
    return null
  }

  return (
    <div className={classes.projectDescription}>
      <p className={classes.text}>
        {HTMLReactParser(nextLineToBreak(removeTags(description)))}
      </p>
      {!!image && <Image
        className={classes.img}
        src={image}
        alt=""
        width={400}
        height={400}
      />}
    </div>
  )
}

export { ProjectDescription }