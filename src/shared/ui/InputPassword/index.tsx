import classes from './input-password.module.scss'
import { Input, InputProps } from '@shared/ui/Input'
import { FC, ForwardedRef, forwardRef, useState } from 'react'
import { HandySvg } from 'handy-svg'
import clsx from 'clsx'

interface Props extends InputProps {
}

const InputPassword: FC<InputProps> = forwardRef(({
                                                    className,
                                                    label,
                                                    rightSlot,
                                                    ...props
                                                  }, ref: ForwardedRef<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Input
      ref={ref}
      label={label}
      className={clsx(classes.input, className)}
      {...props}
      type={showPassword ? 'text' : 'password'}
      rightSlot={(
        <button
          type="button"
          className={classes.eyeButton}
          aria-label={showPassword ? 'Скрыть' : 'Показать'}
          onClick={() => setShowPassword(!showPassword)}
        >
          <HandySvg
            src={`/assets/icons/${showPassword ? 'eye' : 'eye-closed'}.svg`}
            width={20}
            height={20}
          />
        </button>
      )}
    />
  )
})

InputPassword.displayName = 'InputPassword'

export { InputPassword }