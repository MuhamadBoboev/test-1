import classes from './selected-service-list.module.scss'
import { SelectedServicesType } from '@modules/cart/model/SelectedServicesType'
import clsx from 'clsx'
import { HandySvg } from 'handy-svg'
import { useAppDispatch } from '@shared/lib/redux-hooks'
import { removeServicesFromCart } from '@modules/cart/lib/removeServicesFromCart'

interface Props {
  services: SelectedServicesType[]
  productCartId: string

  removeService(serviceId: number): void
  removeServices(): void
}

function SelectedServiceList({services, productCartId, removeService, removeServices}: Props) {
  const dispatch = useAppDispatch()

  if (!services || !services.length) {
    return (
      <p className={classes.emptyTitle}>Услуги не выбраны</p>
    )
  }

  return (
    <div className={classes.selectedServices}>
      <button
        className={classes.clear}
        onClick={() => {
          dispatch(removeServicesFromCart({productCartId}))
          removeServices()
        }}
      >
        Очистить
      </button>
      <ul className={classes.list}>
        {services.map(({serviceId, service, serviceQuantity, serviceValue}) => (
          <li
            key={serviceId}
            className={classes.item}
          >
            <h3 className={classes.name}>{service.name}</h3>
            <dl className={classes.propList}>
              <div className={classes.listItem}>
                <dt className={classes.title}>Количество</dt>
                <dd className={classes.value}>{serviceValue}</dd>
              </div>
              <div className={classes.listItem}>
                <dt className={classes.title}>Кол-во товара</dt>
                <dd className={classes.value}>{serviceQuantity}</dd>
              </div>
              <div className={classes.listItem}>
                <dt className={classes.title}>Цена</dt>
                <dd className={clsx(classes.value, classes.price)}>
                  {service.price * serviceValue * serviceQuantity} с.
                </dd>
              </div>
            </dl>
            <button
              className={classes.remove}
              onClick={() => {
                removeService(serviceId)
              }}
              aria-label="Убрать услугу"
            >
              <HandySvg
                src="/assets/icons/close-lite.svg"
                width={24}
                height={24}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { SelectedServiceList }