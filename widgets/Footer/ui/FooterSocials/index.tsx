import classes from './footer-socials.module.scss'
import { socials } from '@modules/company'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'
import { socialsFooter } from '@modules/company/consts/socials'

function FooterSocials() {
  return (
    <div className={classes.socials}>
      <h3 className={classes.title}>Социальные сети</h3>
      <ul className={classes.list}>
        {socialsFooter.map(({link, icon, name}) => (
          <li key={name} className={classes.item}>
            <Link
              href={link}
              target="_blank"
              className={classes.link}
              aria-label={name}
            >
              <HandySvg
                src={`/assets/icons/socials/${icon}`}
                width={24}
                height={24}
              />
              <p className={classes.socialName}>{name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { FooterSocials }