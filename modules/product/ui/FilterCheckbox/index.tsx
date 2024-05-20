import classes from './filter-checkbox.module.scss'
import { AllHTMLAttributes, ReactNode } from 'react'

interface Props extends AllHTMLAttributes<HTMLInputElement> {
  children: ReactNode
}

function FilterCheckbox({children, ...props}: Props) {

  return (
    <label className={classes.checkbox}>
      <span className={classes.name}>{children}</span>
      <input
        className={classes.input}
        type="checkbox"
        name="checkbox"
        {...props}
      />
      <span className={classes.checkmark}/>
    </label>
  )
}

export { FilterCheckbox }