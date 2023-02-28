import clsx from 'clsx'
import { forwardRef, type DetailedHTMLProps, type InputHTMLAttributes, type ReactNode } from 'react'

type Props = {
  errorMessage?: string
  isDisabled?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'disabled'>

export const Field = forwardRef<HTMLInputElement, Props>(
  ({ errorMessage, isDisabled, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className={clsx('text-field relative w-full', { 'opacity-80': isDisabled })}>
        <input
          type="text"
          className={clsx(
            'w-full rounded-md bg-grey-100 px-6 py-2 outline-none transition-all focus:ring',
            'border border-grey-100',
            { 'pl-12': leftIcon },
            { 'pr-12': rightIcon },
            { 'focus:ring-secondary-red-400': errorMessage },
            { 'border-secondary-red-400': errorMessage }
          )}
          disabled={isDisabled}
          {...props}
          ref={ref}
        />

        {leftIcon && (
          <div className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-grey-500">
            {leftIcon}
          </div>
        )}

        {rightIcon && (
          <div className="absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 text-grey-500">
            {rightIcon}
          </div>
        )}

        <span
          className={clsx(
            'absolute top-full left-0 mt-1 text-xs text-secondary-red-400 transition-all',
            {
              'opacity-0': !errorMessage,
              'opacity-100': errorMessage,
            }
          )}
        >
          {errorMessage}
        </span>
      </div>
    )
  }
)
