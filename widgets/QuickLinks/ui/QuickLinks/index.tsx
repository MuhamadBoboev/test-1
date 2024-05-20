'use client'
import classes from './quick-links.module.scss'
import { quickLinksList } from '@widgets/QuickLinks/lib/quick-links-list'
import Link from 'next/link'
import { HandySvg } from 'handy-svg'
import { Wrapper } from '@shared/ui/Wrapper'

function QuickLinks() {
  return (
    <section className={classes.quickLinks}>
      <h2 className={classes.title}>Быстрые ссылки</h2>
      <Wrapper>
        <ul className={classes.list}>
          {quickLinksList.map(({id, icon, name, url}) => (
            <li key={id} className={classes.item}>
              <Link
                href={url}
                className={classes.link}
                target={url.startsWith('http') ? '_blank' : '_self'}
              >
                <div className={classes.icon}>
                  <HandySvg
                    src={icon}
                    width={24}
                    height={24}
                  />
                </div>
                <span className={classes.name}>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Wrapper>
    </section>
  )
}

export { QuickLinks }