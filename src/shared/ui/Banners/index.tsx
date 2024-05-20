import classes from './banners.module.scss'
import { IBanner } from '@shared/interfaces/IBanner'
import { Banner } from '@shared/ui/Banners/Banner'
import { Wrapper } from '@shared/ui/Wrapper'

interface Props {
  slot1?: IBanner | null
  slot2?: IBanner | null
}

function Banners({slot1, slot2}: Props) {
  if (!slot1 && !slot2) {
    return null
  }

  return (
    <section className={classes.banners}>
      <Wrapper className={classes.wrapper}>
        {!!slot1 && <Banner className={classes.slot1} {...slot1}/>}
        {!!slot2 && <Banner className={classes.slot2} {...slot2}/>}
      </Wrapper>
    </section>
  )
}

export { Banners }