import { AllHTMLAttributes } from 'react'
import Link from 'next/link'

export interface ButtonProps extends AllHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  tag?: 'a' | 'button' | typeof Link
  theme?: ButtonTheme
  buttonSize?: ButtonSize
  radiusSize?: ButtonRadiusSize
  fullWidth?: boolean
}

type ButtonTheme = 'primary' | 'primaryOutline' | 'lightOutline'
type ButtonSize = 'small' | 'large' | 'moreButton'
type ButtonRadiusSize = 'small' | 'large'