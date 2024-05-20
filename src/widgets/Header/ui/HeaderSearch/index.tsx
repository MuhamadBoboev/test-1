'use client'
import classes from './header-search.module.scss'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'
import { Button } from '@shared/ui/Button'
import { SearchResult } from '@widgets/Search'
import { useRef, useState } from 'react'
import clsx from 'clsx'
import { SWRConfig } from 'swr'
import { usePathname, useRouter } from 'next/navigation'
import { SwrProvider } from '@config/providers/SWRProvider'
import { useOnClickOutside } from 'usehooks-ts'

function HeaderSearch() {
	const [value, setValue] = useState('')
	const inputRef = useRef<HTMLInputElement | null>(null)
	const searchRef = useRef<HTMLInputElement | null>(null)
	const router = useRouter()
	const pathname = usePathname()

	useOnClickOutside(searchRef, () => setValue(value))

	return (
		<div className={classes.headerSearch}>
			<form
				className={classes.form}
				onSubmit={(event) => {
					event.preventDefault()
					if (value !== '') {
						router.push(`/products?search=${value}`)
						setValue('')
					}
				}}
			>
				<div className={clsx(classes.search, value !== '' && classes.activeSearch)}>
					<Link
						href="/products"
						className={clsx(classes.catalogLink, pathname === '/products' && classes.active)}
					>
						<HandySvg
							src="/assets/icons/catalog.svg"
							width={24}
							height={24}
						/>
						Каталог
					</Link>
					<div ref={searchRef} className={classes.inputWrapper}>
						<input
							ref={inputRef}
							className={classes.searchInput}
							type="text"
							placeholder="Я ищу..."
							value={value}
							onChange={(event) => setValue(event.target.value)}
						/>
						<SwrProvider>
							{value && <SearchResult
								value={value}
								close={() => {
									setValue('')
								}}
							/>}
						</SwrProvider>
					</div>
				</div>
				<Button
					className={classes.submit}
					type="button"
					buttonSize="large"
					radiusSize="large"
					onClick={() => {
						if (value === '') {
							if (inputRef.current) {
								inputRef.current?.focus()
							}
						} else {
							router.push(`/products?search=${value}`)
							setValue('')
						}
					}}
				>
					<HandySvg
						src="/assets/icons/search.svg"
						width={24}
						height={24}
					/>
					Найти
				</Button>
			</form>
		</div>
	)
}

export { HeaderSearch }