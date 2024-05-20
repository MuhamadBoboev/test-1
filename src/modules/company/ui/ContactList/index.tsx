import classes from './contact-list.module.scss'
import { ContactCard } from '@modules/company/ui/ContactCard'
import { CompanyCard } from '@modules/company/ui/CompanyCard'
import { IShowroom } from '@modules/company/model/IShowroom'

interface Props {
  showrooms: IShowroom[]
}

function ContactList({showrooms}: Props) {
  if (!showrooms.length) {
    return null
  }

  return (
    <CompanyCard className={classes.section}>
      <h2 className={classes.title}>Адреса и телефоны шоурумов</h2>
      <ul className={classes.list}>
        {showrooms.map(contact => (
          <ContactCard key={contact.id} {...contact}/>
        ))}
      </ul>
    </CompanyCard>
  )
}

export { ContactList }