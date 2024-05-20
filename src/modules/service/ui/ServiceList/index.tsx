import classes from './service-list.module.scss'
import { IService } from '@modules/service/model/IService'
import { ServiceCard } from '@modules/service/ui/ServiceCard'

interface Props {
  services: IService[]
}

function ServiceList({services}: Props) {

  if (!services.length) {
    return (
      <p className={classes.emptyTitle}>Нет услуг</p>
    )
  }

  return (
    <ul className={classes.list}>
      {services.map(({id, name, description, image, slug, unit, price}) => (
        <li
          key={id}
          className={classes.item}
        >
          <ServiceCard
            name={name}
            price={price}
            image={image}
            slug={slug}
            description={description}
            unit={unit}
          />
        </li>
      ))}
    </ul>
  )
}

export { ServiceList }