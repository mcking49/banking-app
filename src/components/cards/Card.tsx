import { clsx } from 'clsx'
import type { ReactNode, FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type ParentElProps = {
  to?: string
}

const LinkOrFragment: FC<PropsWithChildren<ParentElProps>> = ({ children, to }) =>
  to ? <Link to={to}>{children}</Link> : <>{children}</>

type CardProps = {
  heading: string | ReactNode
  /**
   * If given, it will appear as a link
   */
  to?: string
}

type Props = PropsWithChildren<CardProps>

export const Card: FC<Props> = ({ heading, children, to }) => (
  <LinkOrFragment to={to}>
    <div
      className={clsx(
        'flex w-64 flex-col items-center justify-center gap-1 rounded-md bg-white p-4 drop-shadow-md',
        to && 'scale-100 cursor-pointer transition-all hover:scale-[102%] active:scale-[98%]'
      )}
    >
      {typeof heading === 'string' ? <p className="text-sm font-light">{heading}</p> : heading}
      {children}
    </div>
  </LinkOrFragment>
)
