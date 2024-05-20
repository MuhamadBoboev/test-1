'use client'
import classes from './search-mobile.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { useAppDispatch, useAppSelector } from '@shared/lib/redux-hooks'
import { SearchResult } from '@widgets/Search'
import { closeSearch } from '@widgets/Search/model/searchSlice'
import { useOnClickOutside } from 'usehooks-ts'
import { HandySvg } from 'handy-svg'
import { useRouter } from 'next/navigation'

function SearchMobile() {
  const {isOpen} = useAppSelector(state => state.search)
  const dispatch = useAppDispatch()
  const searchRef = useRef(null)
  const [value, setValue] = useState('')
  const router = useRouter()
  const transitions = useTransition(isOpen, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
    config: {duration: 150},
  })

  useEffect(() => {
    if (!isOpen) {
      setValue('')
    }
  }, [isOpen])

  useOnClickOutside(searchRef, () => {
    // setValue('')
    dispatch(closeSearch())
  })
  return (
    <div ref={searchRef}>
      {transitions((styles) => isOpen && (
        <animated.div
          style={styles}
          className={classes.searchMobile}
        >
          <div className={classes.main}>
            <form
              className={classes.inputForm}
              onSubmit={async event => {
                event.preventDefault()
                if (value !== '') {
                  await router.push(`/products?search=${value}`)
                  // setValue('')
                  dispatch(closeSearch())
                }
              }}
            >
              <input
                type="text"
                className={classes.input}
                placeholder="Я ищу..."
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </form>
            <button
              className={classes.search}
              aria-label="Закрыть"
              onClick={() => {
                dispatch(closeSearch())
              }}
            >
              <HandySvg
                src={`/assets/icons/close.svg`}
                width={24}
                height={24}
              />
            </button>
            {value && (
              <SearchResult
                value={value}
                close={() => {
                  dispatch(closeSearch())
                  setValue('')
                }}
              />
            )}
          </div>
        </animated.div>
      ))}
    </div>
  )
}

export { SearchMobile }
