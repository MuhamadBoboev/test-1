import classes from './product-list.module.scss'
import { IProductsData } from '@modules/product/model/IProduct'
import { ProductCard } from '@modules/product'
import { Pagination } from '@shared/ui/Pagination'
import { SearchParamsType } from '@shared/interfaces/SearchParamsType'
import { useRouter } from 'next/navigation'
import { ICollection, ICollectionData } from '@modules/product/model/ICollection'
import { Collections } from '@modules/product/ui/Collections'
import { useScroll } from '@react-spring/web'

interface Props {
	data: IProductsData | ICollectionData
	searchParams: SearchParamsType
	viewType: 'products' | 'collections'
}

function ProductList({ data, searchParams, viewType }: Props) {
	const router = useRouter()

	const handleChangePage = ({ selected }: { selected: number }) => {
		const params: any = {
			...searchParams,
			page: (selected + 1).toString(),
		}
		const query = Object.keys(params).map(key => {
			return `${key}=${params[key].toString()}`
		}).join('&')
		router.push(`/products?${query}`)
		window.scroll(0, 0)
	}

	let activePage = isNaN(+searchParams?.page) ? 0 : +searchParams?.page - 1

	if (data.data.length === 0) {
		return (
			<div className={classes.products}>
				<p className={classes.emptyTitle}>{viewType === 'products' ? 'Товаров не найдено' : 'Коллекции нет'}</p>
			</div>
		)
	}

	return (
		<div className={classes.products}>
			{viewType === 'products' && <ul className={classes.list}>
				{(data as IProductsData).data.map((product) => (
					<li key={product.id} className={classes.item}>
						<ProductCard {...product} />
					</li>
				))}
			</ul>}
			{viewType === 'collections' && (
				<Collections collections={data.data as ICollection[]} />
			)}
			<Pagination
				forcePage={activePage}
				pageCount={data.meta.last_page}
				onPageChange={handleChangePage}
			/>
		</div>
	)
}

export { ProductList }