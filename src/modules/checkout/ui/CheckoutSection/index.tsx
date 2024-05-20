import classes from './checkout-section.module.scss'
import { Wrapper } from '@shared/ui/Wrapper'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { PropsWithChildren } from 'react'

function CheckoutSection({children}: PropsWithChildren) {
  return (
    <Wrapper className={classes.wrapper}>
      <Breadcrumbs
        className={classes.breadcrumbs}
        includeHome
        items={[
          {label: 'Корзина', link: '/cart'},
          {label: 'Оформление заказа', isActive: true},
        ]}
      />
      <header className={classes.header}>
        <h1 className={classes.title}>Оформление заказа</h1>
      </header>
      {children}
    </Wrapper>
  )
}

export { CheckoutSection }