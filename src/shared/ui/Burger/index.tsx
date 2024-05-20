'use client'
import classes from './burger.module.scss'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import clsx from 'clsx'
import { toggleMenu } from '@widgets/Header/model/menuSlice'

function Burger() {
  const {isOpen} = useAppSelector(state => state.menu)
  const dispatch = useAppDispatch()

  return (
    <button
      className={clsx(classes.burger, isOpen && classes.open)}
      onClick={() => dispatch(toggleMenu())}
      aria-label="Открыть меню"
    >
      <span/>
    </button>
  )
}

export { Burger }