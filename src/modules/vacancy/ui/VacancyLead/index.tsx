'use client'
import classes from './vacancy-lead.module.scss'
import { Button } from '@shared/ui/Button'
import { useState } from 'react'
import { VacancyLeadModal } from '@modules/vacancy/ui/VacancyLeadModal'

interface Props {
  vacancyId: number
}

function VacancyLead({vacancyId}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={classes.lead}>
      <VacancyLeadModal
        vacancyId={vacancyId}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      />
      <h2 className={classes.title}>Заинтересовала вакансия?</h2>
      <p className={classes.description}>
        Прикрепите своё резюме, Мы рассмотрим вашу заявку и
        свяжемся с вами.
      </p>
      <Button
        theme="primary"
        onClick={() => setIsOpen(true)}
        fullWidth
        buttonSize="large"
      >
        Откликнуться
      </Button>
    </div>
  )
}

export { VacancyLead }