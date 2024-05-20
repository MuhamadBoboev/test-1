import classes from './not-found-page.module.scss'
import Image from 'next/image'
import { Button } from '@shared/ui/Button'
import Link from 'next/link'

function NotFoundPage() {
  return (
    <div className={classes.main}>
      <Image
        className={classes.img}
        src="/assets/img/404-error-illustration.svg"
        alt=""
        width={924}
        height={704}
      />
      <Button
        className={classes.toHome}
        href="/"
        tag={Link}
        buttonSize="large"
        theme="primary"
      >
        На главную страницу
      </Button>
    </div>
  )
}

export { NotFoundPage }