'use client'
import classes from './search-result.module.scss'
import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { ISearchProduct } from '@widgets/Search/model/ISearchProduct'
import { BarLoader } from '@shared/ui/loaders/BarLoader'
import Link from 'next/link'

interface Props {
	value: string
	close(): void
}

function SearchResult({ value, close }: Props) {
	const {
		data: products,
		isLoading,
		isValidating,
	} = useSWR<{ data: ISearchProduct[] }>(`/products/search?search=${value}&per_page=6&filter_quantity=1&filter_active=1`, getFetcher)

	const isShowList = products && !!products.data.length && !isLoading && !isValidating
	const isEmpty = !products?.data.length && !isLoading && !isValidating

	return (
		<div className={classes.searchResult}>
			{(isLoading || isValidating) && (
				<BarLoader
					className={classes.loader}
					color="#FE7100"
					size={2}
					width={30}
					height={30}
				/>
			)}
			{isEmpty && (
				<p className={classes.empty}>По вашему запросу ничего не найдено</p>
			)}
			{isShowList && <ul className={classes.list}>
				{products.data.map(({ id, name, slug }) => (
					<li key={id} className={classes.item}>
						<Link
							title={name}
							className={classes.link}
							href={`/products/${slug}`}
							onClick={close}
						>
							{name}
						</Link>
					</li>
				))}
			</ul>}
		</div>
	)
}

export { SearchResult }