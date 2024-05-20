import classes from './company-section.module.scss'
import { Section } from '@shared/ui/Section'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'
import { ReactNode } from 'react'
import { Wrapper } from '@shared/ui/Wrapper'
import { CompanyTabs } from '@modules/company/ui/CompanyTabs'

interface Props {
  title: string
  breadcrumb?: string
  children: ReactNode
}

function CompanySection({title, breadcrumb = title, children}: Props) {
  return (
    <div className={classes.block}>
      <Wrapper className={classes.breadcrumb}>
        <Breadcrumbs
          includeHome
          items={[{label: breadcrumb, isActive: true}]}
        />
      </Wrapper>
      <Section
        name={title}
        className={classes.section}
        mainTitle
        buttonMore={(
          <CompanyTabs/>
        )}
        buttonMoreProps={{
          className: classes.buttonMore
        }}
        headerProps={{
          className: classes.headerSection
        }}
        nameProps={{className: classes.title}}
      >
        {children}
      </Section>
    </div>
  )
}

export { CompanySection }