import { CompanySection } from '@modules/company/ui/CompanySection'
import classes from './delivery.module.scss'
import { CompanyCard } from '@modules/company/ui/CompanyCard'
import clsx from 'clsx'
import Image from 'next/image'

function Delivery() {
  return (
    <CompanySection title="Доставка">
      <div className={classes.cards}>
        <CompanyCard className={classes.card}>
          <h2 className={classes.title}>Информация о доставке</h2>
          <p className={classes.text}>
            Чтобы обеспечить еще больший комфорт для наших клиентов и убедиться в сохранности купленных товаров, мы осуществляем доставку по городу Душанбе: доставка до  Мебельного завода (30 сомони), по городу (50 сомони), в такие районы города, как Зарафшон, Испечак, Сельхоз, ДОК (100 сомони), а также в отдаленные районы города - Корвон, Гипрозем, Кошониен, 9 км и т.д. (150 сомони).
          </p>
        </CompanyCard>
        <CompanyCard className={clsx(classes.card, classes.logoCard)}>
          <Image
            className={classes.logo}
            src="/assets/img/logo.svg"
            alt="Pro Mebel лучшее для вдохновения"
            width={345}
            height={113}
          />
        </CompanyCard>
      </div>
    </CompanySection>
  )
}

export { Delivery }