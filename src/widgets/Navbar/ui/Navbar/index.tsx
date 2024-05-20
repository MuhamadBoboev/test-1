'use client'
import classes from './navbar.module.scss'
import { Wrapper } from '@shared/ui/Wrapper'
import { getNavLinks } from '@widgets/Navbar/consts/navbarLinks'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { openAuth } from '@modules/auth/model/authSlice'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { CountChip } from '@shared/ui/CountChip'

function Navbar() {
  const dispatch = useAppDispatch()
  const {user, isOpen} = useAppSelector(state => state.auth)
  const isOpenMenu = useAppSelector(state => state.menu.isOpen)
  const pathname = usePathname()
  const cartProducts = useAppSelector(state => state.cart.products)

  if (isOpenMenu) {
    return null
  }

  return (
    <div className={classes.navbar}>
      <Wrapper className={classes.wrapper}>
        <ul className={classes.list}>
          {getNavLinks(!!user).map(({icon, name, link}) => (
            <li
              key={name}
              className={classes.item}
            >
              <Link
                href={link}
                className={clsx(
                  classes.link,
                  pathname === link && classes.activeLink,
                  link === '#login' && isOpen && classes.activeLink,
                )}
                onClick={(event) => {
                  if (link.startsWith('#')) {
                    event.preventDefault()
                  }
                  if (link === '#login') {
                    dispatch(openAuth('login'))
                  }
                }}
              >
                <HandySvg
                  src={icon}
                  width={26}
                  height={26}
                />
                <span className={classes.label}>{name}</span>
                {link === '/cart' && pathname !== '/cart' && (
                  <CountChip
                    count={cartProducts.length}
                    className={classes.cartChip}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Wrapper>
    </div>
  )
}

export { Navbar }