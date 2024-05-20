import classes from './about.module.scss'
import { CompanySection } from '@modules/company/ui/CompanySection'
import { CompanyCard } from '@modules/company/ui/CompanyCard'
import Image from 'next/image'
import clsx from 'clsx'

function About() {
  return (
    <CompanySection title="О нас">
      <div className={classes.cards}>
        <CompanyCard className={classes.card}>
        <h3 className={classes.subtitle}><b>PRO Mebel</b></h3>
          <p className={classes.text}>
             - это уникальные, мультибрендовые шоурумы мебельных материалов и фурнитуры в Таджикистане.
            В ассортименте есть все для производства мебели: ЛДСП, ЛМДФ, ЛХДФ, столешницы, шлифованные ДСП и МДФ,
            мебельная и лицевая фурнитура, мойки из искусственного камня, механизмы для шкафов-купе, напольный ламинат и
            многое другое. В настоящее время шоурумы PRO Mebel открыты в городах Худжанд и Душанбе. Мебельные фабрики,
            мебельные магазины, мебельные мастера, а также конечные потребители имеют возможность приобрести
            высококачественные материалы для производства мебели из Австрии, Турции, Польши, Италии, России, Казахстана
            и Узбекистана. Со многими Европейскими поставщиками мы имеем эксклюзивные контракты.
          </p>
          <h3 className={classes.subtitle}>Ценности компании</h3>
          <ul className={classes.list}>
            <li className={classes.item}>- Честность - искренность к себе, без единого противоречия к своим действиям, что создаёт прозрачные
              отношения внутри команды и с клиентом.
            </li>
            <li className={classes.item}>- Ответственность - каждый сотрудник должен быть готов выполнять обязательства, принимать решения и
              отвечать
              за их результат.
            </li>
            <li className={classes.item}>- Профессионализм - выполнять свою работу с высоким результатом, совершенствование своей
              непосредственной
              деятельности, освоение нового опыта и передовых технологий.
            </li>
            <li className={classes.item}>- Развитие - эффективный рост и обновление производства, внедрение самых современных технологий,
              повышение
              профессионального уровня сотрудников.
            </li>
            <li className={classes.item}>- Клиентоориентированность - готовность и открытость к решению вопросов клиентов.</li>
          </ul>
        </CompanyCard>
        <div className={classes.sidebar}>
          <CompanyCard className={clsx(classes.card, classes.logoCard)}>
            <Image
              className={classes.logo}
              src="/assets/img/logo.svg"
              alt="Pro Mebel лучшее для вдохновения"
              width={345}
              height={113}
            />
          </CompanyCard>
          <CompanyCard className={classes.card}>
            <h2 className={classes.title}>Миссия компании</h2>
            <p className={classes.text}>
              Мы работаем, чтобы быть лучшими на рынке и удовлетворять все потребности клиента,
              путём предоставления лучших продуктов и услуг для производства мебели
              высокого качества по доступным ценам.
            </p>
          </CompanyCard>
        </div>
      </div>
    </CompanySection>
  )
}

export { About }
