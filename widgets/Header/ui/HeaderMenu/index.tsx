import classes from './header-menu.module.scss'
import { menuList } from '@shared/consts/menuList'
import Link from 'next/link'
import { Wrapper } from '@shared/ui/Wrapper'

function HeaderMenu() {
  return (
    <Wrapper className={classes.wrapper}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          {menuList.map(({name, href}) => (
            <li key={href} className={classes.item}>
              <Link className={classes.link} href={href}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Wrapper>
  )
}

export { HeaderMenu }