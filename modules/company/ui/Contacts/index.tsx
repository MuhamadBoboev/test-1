import classes from './contacts.module.scss'
import { CompanyCard } from '@modules/company/ui/CompanyCard'
import { CompanySection } from '@modules/company/ui/CompanySection'
import { Socials } from '@modules/company/ui/Socials'
import Link from 'next/link'
import clsx from 'clsx'
import { ContactList } from '@modules/company/ui/ContactList'
import { IShowroom } from '@modules/company/model/IShowroom'

interface Props {
  showrooms: IShowroom[]
}

function Contacts({ showrooms }: Props) {
  return (
    <CompanySection title="Контакты">
      {/* <ContactList showrooms={showrooms} /> */}
      <div className={classes.cards}>
        <CompanyCard className={classes.address}>
          <h2 className={classes.title}>Адрес</h2>
          <p className={clsx(classes.text, classes.addressText)}>
            г. Душанбе, ул. Карин Манн, 130
          </p>
          <iframe
            className={classes.map}
            src="https://yandex.ru/map-widget/v1/?ll=68.786833%2C38.555357&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgozMTEyMjY3NzMxEknQotC-0rfQuNC60LjRgdGC0L7QvSwg0JTRg9GI0LDQvdCx0LUsINC606_Rh9Cw0Lgg0JrQsNGA0LjQvSDQnNCw0L3QvSwgMTMwIgoNv5KJQhW1OBpC&z=19.42"
            width="560"
            height="400"
          ></iframe>
        </CompanyCard>
        <CompanyCard className={classes.address}>
          <h2 className={classes.title}>Адрес</h2>
          <p className={clsx(classes.text, classes.addressText)}>
            г. Душанбе, ул. Карин Манн, 130
          </p>
          <iframe
            className={classes.map}
            src="https://yandex.ru/map-widget/v1/?ll=68.786833%2C38.555357&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgozMTEyMjY3NzMxEknQotC-0rfQuNC60LjRgdGC0L7QvSwg0JTRg9GI0LDQvdCx0LUsINC606_Rh9Cw0Lgg0JrQsNGA0LjQvSDQnNCw0L3QvSwgMTMwIgoNv5KJQhW1OBpC&z=19.42"
            width="560"
            height="400"
          ></iframe>
        </CompanyCard>
        <CompanyCard className={classes.card}>
          <h2 className={classes.title}>Контакты</h2>
          <p className={classes.text}>
            Будьте в курсе акцийи и новинок нашего магазина
          </p>
          <div className={classes.contactGroup}>
          <Link
            href="tel:+992487018887"
            className={clsx(classes.link, classes.phone)}
          >
            +992 487 01 88 87
          </Link>
          <Link
            href="tel:+992487028887"
            className={clsx(classes.link, classes.phone)}
          >
            +992 487 02 88 87
          </Link>
          <Link href="mailto:info@promebel.tj" className={classes.link}>
            info@promebel.tj
          </Link></div>
        </CompanyCard>
        <CompanyCard className={classes.card}>
          <h2 className={classes.title}>Соц. сети и мессенджеры</h2>
          <p className={classes.text}>
            Будьте в курсе акцийи и новинок нашего магазина
          </p>
          <Socials />
        </CompanyCard>
      </div>
    </CompanySection>
  )
}

export { Contacts }
