import { clsx } from 'clsx'
import type { ReactNode, FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type LinkOrFragmentProps = {
  to?: string | null
}

const LinkOrFragment: FC<PropsWithChildren<LinkOrFragmentProps>> = ({ children, to }) =>
  to ? <Link to={to}>{children}</Link> : <>{children}</>

type CardProps = {
  heading: string | ReactNode
  isDisabled?: boolean
  isDisabledText?: string | null
  /**
   * If given, it will appear as a link
   */
  to?: string
}

type Props = PropsWithChildren<CardProps>

export const Card: FC<Props> = ({ heading, children, isDisabled, isDisabledText, to }) => (
  <LinkOrFragment to={isDisabled ? null : to}>
    <div
      className={clsx(
        'flex w-64 flex-col items-center justify-center gap-1 rounded-md border-x-4 border-white p-4',
        !isDisabled && 'bg-white drop-shadow-md',
        isDisabled && 'border-r-grey-40 border-l-secondary-yellow-400 bg-grey-40',
        to &&
          !isDisabled &&
          'scale-100 cursor-pointer transition-all hover:scale-[102%] active:scale-[98%]'
      )}
    >
      {isDisabled && isDisabledText && (
        <div className="rounded-full bg-secondary-yellow-400 py-1 px-4 text-xs font-bold uppercase text-secondary-yellow-900 shadow-md">
          {isDisabledText}
        </div>
      )}
      {typeof heading === 'string' ? (
        <p className={clsx('text-sm font-light', isDisabled && 'text-grey-400')}>{heading}</p>
      ) : (
        heading
      )}
      {children}
    </div>
  </LinkOrFragment>
)
