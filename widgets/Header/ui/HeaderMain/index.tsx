'use client'
import classes from './header-main.module.scss'
import { Wrapper } from '@shared/ui/Wrapper'
import { Burger } from '@shared/ui/Burger'
import { MenuMobile } from '@widgets/Header/ui/MenuMobile'
import Link from 'next/link'
import { HeaderSearch } from '@widgets/Header/ui/HeaderSearch'
import { HeaderRight } from '@widgets/Header/ui/HeaderRight'
import { SearchMobile } from '@widgets/Search'
import { SwrProvider } from '@config/providers/SWRProvider'
import { useAppDispatch } from '@shared/lib/redux-hooks'
import { closeMenu } from '@widgets/Header/model/menuSlice'

function HeaderMain() {
  const dispatch = useAppDispatch()

  return (
    <div className={classes.main}>
      <Wrapper className={classes.wrapper}>
        <SwrProvider>
          <SearchMobile/>
        </SwrProvider>
        <Burger/>
        <MenuMobile/>
        <Link
          href="/"
          className={classes.logo}
          onClick={() => {
            dispatch(closeMenu())
          }}
        >
          <img
            src="/assets/img/logo.svg"
            alt="PRO MEBEL"
            width={160}
            height={52}
          />
        </Link>
        <HeaderSearch/>
        <HeaderRight/>
      </Wrapper>
    </div>
  )
}

export { HeaderMain }