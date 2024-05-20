import { Button } from '@/shared/ui/Button'
import classes from './specialist-card.module.scss'
import { ISpecialist } from '@modules/specialists/model/ISpecialist'
import Image from 'next/image'
import Link from 'next/link'
import { removeSpaces } from '@/shared/lib/removeSpaces'

function SpecialistCard({
  name,
  avatar,
  slug,
  experience,
  specialization,
  instagram,
  phone,
}: ISpecialist) {
  return (
    <div className={classes.link} >
      <article className={classes.card}>
        <header className={classes.header}>
          <div className={classes.avatar}>
            <Image
              className={classes.img}
              src={avatar || '/assets/icons/user.svg'}
              alt={name}
              width={48}
              height={48}
              quality={100}
            />
          </div>
          <div className={classes.mainInfo}>
            <h3 className={classes.name}>{name}</h3>
            <p className={classes.specialization}>{specialization}</p>
          </div>
        </header>
        <div className={classes.main}>
          <dl className={classes.list}>
            <div className={classes.item}>
              <dt className={classes.title}>Специализация</dt>
              <dd className={classes.value} title={specialization}>
                {specialization}
              </dd>
            </div>
            <div className={classes.item}>
              <dt className={classes.title}>Стаж работы</dt>
              <dd className={classes.value} title={experience || 'не указан'}>
                {experience || 'не указан'}
              </dd>
            </div>
          </dl>
          <div className={classes.buttons}>
            {instagram && (
              <Button
                className={classes.whatsapp}
                fullWidth
                tag={Link}
                buttonSize="large"
                theme="primary"
                href={instagram}
                target="_blank"
              >
                Профиль Инстаграм
              </Button>
            )}
            {phone && (
              <Button
                className={classes.phone}
                fullWidth
                tag="a"
                buttonSize="large"
                theme="primary"
                href={`tel:${removeSpaces(phone)}`}
              >
                Позвонить
              </Button>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export { SpecialistCard }
