import classes from './order-services.module.scss'
import { IOrderService } from '@modules/order/model/IOrderService'

interface Props {
  services: IOrderService[]
}

function OrderServices({services}: Props) {
  if (!services.length) {
    return null
  }

  return (
    <div>
      <h3 className={classes.title}>Услуги</h3>
      <ul className={classes.services}>
        {services.map(({id, service_name, service_sku, service_quantity, service_value, service_price, service_unit}) => (
          <li key={id} className={classes.card}>
            <h3 className={classes.serviceName}>{service_name}</h3>
            <dl className={classes.list}>
              <div className={classes.item}>
                <dt className={classes.name}>Код услуги:</dt>
                <dd className={classes.value}>{service_sku}</dd>
              </div>
              {!!service_quantity && <div className={classes.item}>
                <dt className={classes.name}>Кол-во товаров:</dt>
                <dd className={classes.value}>
                  {service_quantity}
                </dd>
              </div>}
              {!!service_value && <div className={classes.item}>
                <dt className={classes.name}>Значение:</dt>
                <dd className={classes.value}>{service_value}{service_unit}</dd>
              </div>}
              <div className={classes.item}>
                <dt className={classes.name}>Цена:</dt>
                <dd className={classes.value}>{service_price} с. / {service_unit}</dd>
              </div>
            </dl>
            <div className={classes.prices}>
              <p
                className={classes.price}
              >Сумма <span>{service_price * service_quantity * (service_value ?? 1)} с.</span></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { OrderServices }