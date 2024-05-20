'use client'
import classes from './menu-mobile.module.scss'
import { menuList, menuMobileList } from '@shared/consts/menuList'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { animated, useTransition } from '@react-spring/web'
import { closeMenu } from '@widgets/Header/model/menuSlice'

function MenuMobile() {
  const isOpenMenu = useAppSelector(state => state.menu.isOpen)
  const dispatch = useAppDispatch()
  const transitions = useTransition(isOpenMenu, {
    from: {
      opacity: 0,
      x: -100
    },
    enter: {opacity: 1, x: 0},
    leave: {opacity: 0, x: -100},
    exitBeforeEnter: true,
    config: {
      duration: 150,
    },
  })
  const close = () => dispatch(closeMenu())

  return transitions((styles, isOpen) => isOpen && (
    <animated.div
      style={styles}
      className={classes.menu}
    >
      <ul className={classes.list}>
        {menuMobileList.map(({name, href}) => (
          <li key={href} className={classes.item}>
            <Link
              href={href}
              className={classes.link}
              onClick={close}
            >
              {name}
              <HandySvg
                src="/assets/icons/arrow-right.svg"
                width={24}
                height={24}
              />
            </Link>
          </li>
        ))}
      </ul>
    </animated.div>
  ))
}

export { MenuMobile }