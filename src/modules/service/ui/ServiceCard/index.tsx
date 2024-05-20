import classes from './service-card.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { removeTags } from '@shared/lib/removeTags'
import { HandySvg } from 'handy-svg'
import { Button } from '@/shared/ui/Button'

interface Props {
	image: string
	name: string
	description: string | null
	price: number | null
	slug: string
	unit: string
}

function ServiceCard({ name, description, image, price, unit, slug }: Props) {
	return (
		<article className={classes.card}>
			<div className={classes.group}>
				<div className={classes.left}>
					<Image
						className={classes.img}
						src={image}
						alt={name}
						width={256}
						height={256}
					/>
				</div>
				<h3 className={classes.name} title={name}>
					{name}
				</h3>
			</div>
			<div className={classes.right}>
				<p className={classes.description}>{removeTags(description || '')}</p>
				{!!price && (
					<p className={classes.price}>
						<span className={classes.color}>Стоимость</span>
						{price} с. {unit && `за ${unit}`}
					</p>
				)}
			</div>
			<Link
				className={classes.linkOverflow}
				href={`/services/${slug}`}
				aria-label="Подробнее"
			/>
			<Button className={classes.btn}>Подробнее</Button>
			{/* <Link
        className={classes.arrowLink}
        href={`/services/${slug}`}
        aria-label="Подробнее"
      >
        <HandySvg src="/assets/icons/arrow-link.svg" width={16} height={16} />
      </Link> */}
		</article>
	)
}

export { ServiceCard }
