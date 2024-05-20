import classes from './service-info.module.scss'

interface Props {
  name: string
  description: string | null
  sku: string
  price: number
  unit: string
}

function ServiceInfo({name, description, sku, price, unit}: Props) {
  return (
    <div className={classes.info}>
      <h1 className={classes.name}>{name}</h1>
      <div className={classes.priceAndSku}>
        <p className={classes.price}>
          {price} сомони за {unit}
        </p>
        <p className={classes.sku}>
          Код услуги: {sku}
        </p>
      </div>
      {description && <p className={classes.description}>
        {description}
      </p>}
    </div>
  )
}

export { ServiceInfo }