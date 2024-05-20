import classes from './main-provider-card.module.scss'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  logo: string
  name: string
  slug: string
  tag?: keyof HTMLElementTagNameMap
}

function MainProviderCard({logo, slug, name, tag: Tag = 'li'}: Props) {
  return (
    <Tag className={classes.card}>
      <Link
        href={`/providers/${slug}`}
        className={classes.link}
      >
        <p className={classes.logoWrap}>
          <Image
            className={classes.logo}
            src={logo}
            alt={name}
            width={192}
            height={100}
          />
        </p>
        <h3 className={classes.name}>{name}</h3>
      </Link>
    </Tag>
  )
}

export { MainProviderCard }