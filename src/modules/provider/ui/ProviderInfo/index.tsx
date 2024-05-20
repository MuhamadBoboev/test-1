import classes from './provider-info.module.scss'
import { IProvider } from '@modules/provider'
import { Sanitize } from '@shared/ui/Sanitize'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@shared/ui/Button'
import { HandySvg } from 'handy-svg'

interface Props {
  provider: IProvider
}

function ProviderInfo({provider}: Props) {
  const {name, logo, description} = provider
  return (
    <section className={classes.provider}>
      <div className={classes.left}>
        <h1 className={classes.name}>{name}</h1>
        {description && <div className={classes.description}>
          <Sanitize text={description}/>
        </div>}
        <ul className={classes.categories}>
          {provider.categories.map(({id, name}) => (
            <li
              key={id}
              className={classes.categoryItem}
            >
              <Link
                className={classes.categoryLink}
                href={`/products?providers=${provider.id}&categories=${id}`}
                target="_blank"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.right}>
        <div className={classes.logoWrapper}>
          <Image
            className={classes.logo}
            src={logo}
            alt={name}
            width={288}
            height={288}
          />
        </div>
        {provider.file && <Button
          className={classes.download}
          tag="a"
          href={provider.file}
          fullWidth
          theme="primaryOutline"
          target="_blank"
        >
          Скачать файл
          <HandySvg
            src="/assets/icons/document-download.svg"
            width={20}
            height={20}
          />
        </Button>}
      </div>
    </section>
  )
}

export { ProviderInfo }