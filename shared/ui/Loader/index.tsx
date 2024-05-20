import classes from './loader.module.scss'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import Image from 'next/image'

function Loader() {
  return (
    <div className={classes.loader}>
      <div className={classes.main}>
        <Image
          className={classes.logo}
          src="/assets/img/logo.svg"
          alt="PRO Mebel"
          width={220}
          height={72}
        />
        <BarLoader
          color="#FE7100"
          size={5}
          width={30}
          height={30}
        />
      </div>

    </div>
  )
}

export { Loader }