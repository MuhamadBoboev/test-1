'use client'
import classes from './header-top.module.scss'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'
import clsx from 'clsx'
import { Wrapper } from '@shared/ui/Wrapper'
import { useAppDispatch } from '@shared/lib/redux-hooks'
import { openOrderCall } from '@modules/orderCall'

function HeaderTop() {
  const dispatch = useAppDispatch()

  return (
    <div className={classes.top}>
      <Wrapper className={classes.wrapper}>
        <Link
          target="_blank"
          href="https://yandex.ru/maps/-/CDQ5v2zK"
          className={classes.link}
        >
          <HandySvg
            src="/assets/icons/location.svg"
            width={20}
            height={20}
          />
          г. Душанбе, ул. Карин Манн, 130
        </Link>
        <button
          className={clsx(classes.link, classes.button)}
          onClick={() => dispatch(openOrderCall())}
        >
          <HandySvg
            src="/assets/icons/call.svg"
            width={20}
            height={20}
          />
          Получить консультацию
        </button>
      </Wrapper>
    </div>
  )
}

export { HeaderTop }