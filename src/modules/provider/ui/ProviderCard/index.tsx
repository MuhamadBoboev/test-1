import classes from './provider-card.module.scss'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
	logo: string
	name: string
	slug: string
	customLink?: string
}

function ProviderCard({ name, logo, slug, customLink }: Props) {
	return (
		<li className={classes.card}>
			<Link
				href={customLink || `/providers/${slug}`}
				className={classes.link}
			>
				<div className={classes.logoWrap}>
					<Image
						className={classes.logo}
						src={logo}
						alt={name}
						width={192}
						height={100}
					/>
				</div>
				<h3 className={classes.name}>{name}</h3>
			</Link>
		</li>
	)
}

export { ProviderCard }