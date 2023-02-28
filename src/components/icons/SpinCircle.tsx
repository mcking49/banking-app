import clsx from 'clsx'
import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

export const IconSpinCircle: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className = '', ...props }) => {
  return (
    <div
      className={clsx(
        'border-current inline-block h-8 w-8',
        'animate-spin rounded-full border-4 border-solid border-r-transparent',
        'align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
        className
      )}
      role="status"
      {...props}
    />
  )
}
