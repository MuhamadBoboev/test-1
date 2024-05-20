import classes from './change-input-button.module.scss'
import { HTMLAttributes } from 'react'
import clsx from 'clsx'
import { HandySvg } from 'handy-svg'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  inputId?: string
}

function ChangeInputButton({className, inputId, ...props}: Props) {
  return (
    <button
      className={clsx(classes.changeInput, className)}
      type="button"
      aria-label="Изменить"
      {...props}
      onClick={(event) => {
        if (props.onClick) {
          props.onClick(event)
        }
        if (inputId) {
          const input: HTMLInputElement | null = document.querySelector(`[data-id="${inputId}"]`)
          if (input) {
            setTimeout(() => {
              input.focus()
            }, 100)
          }
        }
      }}
    >
      <HandySvg
        src="/assets/icons/edit.svg"
        width={16}
        height={16}
      />
    </button>
  )
}

export { ChangeInputButton }