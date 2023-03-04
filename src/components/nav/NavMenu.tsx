import { BanknotesIcon as BanknotesIconOutline } from '@heroicons/react/24/outline'
import { BanknotesIcon as BanknotesIconSolid } from '@heroicons/react/24/solid'
import { clsx } from 'clsx'
import type { FC, HTMLAttributes } from 'react'
import { NavLink } from 'react-router-dom'

export const NavMenu: FC<HTMLAttributes<HTMLUListElement>> = ({ className, ...props }) => (
  <ul className={clsx('flex w-full flex-col gap-4 lg:w-auto lg:flex-row', className)} {...props}>
    <li>
      <NavLink
        to="/dashboard/accounts"
        onClick={() => close()}
        className={({ isActive }) =>
          clsx(
            'relative inline-flex w-full items-center rounded-lg py-2 px-4 pl-12 text-grey-800 transition-all lg:w-auto',
            !isActive && 'hover:bg-primary-blue-40 hover:text-primary-blue-900',
            isActive && 'bg-primary-blue-100 text-primary-blue-800'
          )
        }
      >
        {({ isActive }) => (
          <>
            <BanknotesIconOutline
              className={clsx(
                'absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all',
                isActive ? 'opacity-0' : 'opacity-100'
              )}
            />
            <BanknotesIconSolid
              className={clsx(
                'absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all',
                isActive ? 'opacity-100' : 'opacity-0'
              )}
            />
            <span>Accounts</span>
          </>
        )}
      </NavLink>
    </li>
  </ul>
)
