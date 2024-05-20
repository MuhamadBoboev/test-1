import classes from './error-500-page.module.scss'
import Image from 'next/image'
import { Button } from '@shared/ui/Button'
import Link from 'next/link'

function Error500Page() {
  return (
    <div className={classes.main}>
      <Image
        className={classes.img}
        src="/assets/img/500-error-illustration.svg"
        alt=""
        width={713}
        height={573}
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

export { Error500Page }