import { cva, type VariantProps } from 'cva'
import type { ButtonHTMLAttributes, FC } from 'react'

const buttonVariants = cva(['rounded', 'py-2', 'px-4', 'transition-all', 'disabled:opacity-80'], {
  variants: {
    intent: {
      primary: ['bg-primary-blue-700', 'text-white', 'hover:bg-primary-blue-800'],
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
})

export type ButtonVariant = VariantProps<typeof buttonVariants>
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariant

export const Button: FC<ButtonProps> = ({ children, className, intent, ...props }) => (
  <button className={buttonVariants({ intent, className })} {...props}>
    {children}
  </button>
)
