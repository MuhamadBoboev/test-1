import classes from './header.module.scss'
import { HeaderMenu } from '@widgets/Header/ui/HeaderMenu'
import { HeaderTop } from '@widgets/Header/ui/HeaderTop'
import { HeaderMain } from '@widgets/Header/ui/HeaderMain'

function Header() {
  return (
    <header className={classes.header}>
      <HeaderTop/>
      <HeaderMain/>
      <HeaderMenu/>
    </header>
  )
}

export { Header }