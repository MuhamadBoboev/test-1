import classes from './service.module.scss'
import { IService } from '@modules/service/model/IService'
import { Wrapper } from '@shared/ui/Wrapper'
import { ServiceInfo } from '@modules/service/ui/ServiceInfo'
import { ServiceImages } from '@modules/service/ui/ServiceImages'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'

interface Props {
  service: IService
}

function Service({service}: Props) {
  const {
    name,
    description,
    sku,
    price,
    unit,
    image,
    images,
  } = service

  return (
    <section className={classes.service}>
      <Wrapper>
        <Breadcrumbs
          className={classes.breadcrumbs}
          items={[{label: 'Наши услуги', link: '/services'}]}
          includeHome
        />
        <div className={classes.block}>
          <ServiceInfo
            name={name}
            description={description}
            sku={sku}
            price={price}
            unit={unit}
          />
          <ServiceImages
            image={image}
            serviceName={name}
            images={images}
          />
        </div>
      </Wrapper>
    </section>
  )
}

export { Service }