import classes from './contact-card.module.scss'
import { normalizePhoneNumber } from '@shared/lib/normalizePhoneNumber'
import { IShowroom } from '@modules/company/model/IShowroom'

function ContactCard({phones, name, image, address}: IShowroom) {
  return (
    <li className={classes.card}>
      <div className={classes.top}>
        <img
          className={classes.img}
          src={image}
          alt={name}
          width={280}
          height={194}
        />
      </div>
      <h3 className={classes.name}>{name}</h3>
      <p className={classes.address}>
        <span>Адрес: </span>
        {address}
      </p>
      <p className={classes.phonesTitle}>Тел: </p>
      <ul className={classes.phones}>
        {phones?.split('|').map(phone => (
          <li key={phone} className={classes.item}>
            <a className={classes.phone} href={`tel:${phone}`}>
              {normalizePhoneNumber(phone)}
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
}

export { ContactCard }