import classes from './button.module.scss'
import { ForwardedRef, forwardRef } from 'react'
import { ButtonProps } from '@shared/ui/Button/button-props'
import clsx from 'clsx'


const Button = forwardRef(({
                             className,
                             tag: Tag = 'button',
                             theme = 'primary',
                             buttonSize = 'small',
                             radiusSize = 'large',
                             fullWidth,
                             ...props
                           }: ButtonProps, ref: ForwardedRef<any>) => {
  return (
    <>
      {/* @ts-ignore */}
      <Tag
      ref={ref}
      className={clsx(
        classes.button,
        classes[theme],
        classes['size-' + buttonSize],
        classes['radius-' + radiusSize],
        fullWidth && classes.fullWidth,
        className,
      )}
      {...props}
    /></>
  )
})

Button.displayName = 'Button'

export { Button }