import classes from './specialist-info.module.scss'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { ISpecialist } from '@modules/specialists/model/ISpecialist'
import Image from 'next/image'
import { Button } from '@shared/ui/Button'
import Link from 'next/link'
import { removeSpaces } from '@shared/lib/removeSpaces'

function SpecialistInfo({name, avatar, specialization, experience, description, instagram, phone}: ISpecialist) {
  return (
    <div className={classes.info}>
      <Breadcrumbs
        className={classes.breadcrumbs}
        items={[{label: name, isActive: true}]}
        includeHome
      />
      <header className={classes.header}>
        <div className={classes.avatar}>
          <Image
            className={classes.img}
            src={avatar || '/assets/icons/user.svg'}
            alt={name}
            width={64}
            height={64}
          />
        </div>
        <div className={classes.mainInfo}>
          <div className={classes.nameAndSpec}>
            <h1 className={classes.name}>{name}</h1>
            <p className={classes.specialization}>{specialization}</p>
          </div>
          <dl className={classes.list}>
            <div className={classes.item}>
              <dt className={classes.title}>Специализация</dt>
              <dd className={classes.value} title={specialization}>{specialization}</dd>
            </div>
            <div className={classes.item}>
              <dt className={classes.title}>Стаж работы</dt>
              <dd className={classes.value} title={experience || 'не указан'}>
                {experience || 'не указан'}
              </dd>
            </div>
          </dl>
        </div>
      </header>
      <dl className={classes.listMobile}>
        <div className={classes.item}>
          <dt className={classes.title}>Специализация</dt>
          <dd className={classes.value} title={specialization}>{specialization}</dd>
        </div>
        <div className={classes.item}>
          <dt className={classes.title}>Стаж работы</dt>
          <dd className={classes.value} title={experience || 'не указан'}>
            {experience || 'не указан'}
          </dd>
        </div>
      </dl>
      <div className={classes.description}>
        {description}
      </div>
      <div className={classes.buttons}>
        {instagram && <Button
          className={classes.whatsapp}
          fullWidth
          tag={Link}
          buttonSize="large"
          theme="primary"
          href={instagram}
          target="_blank"
        >
          Профиль Инстаграм
        </Button>}
        {phone && <Button
          className={classes.phone}
          fullWidth
          tag="a"
          buttonSize="large"
          theme="primary"
          href={`tel:${removeSpaces(phone)}`}
        >
          Позвонить
        </Button>}
      </div>
    </div>
  )
}

export { SpecialistInfo }