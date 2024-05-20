import classes from './checkbox.module.scss'
import { AllHTMLAttributes, ReactNode } from 'react'

interface Props extends AllHTMLAttributes<HTMLInputElement> {
  children: ReactNode
}

function Checkbox({className, children, ...props}: Props) {
  return (
    <label className={classes.label}>
      <input
        type="checkbox"
        className={classes.input}
        {...props}
      />
      <span className={classes.checkmark}/>
      {children}
    </label>
  )
}

export { Checkbox }