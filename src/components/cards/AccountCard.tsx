import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { clsx } from 'clsx'

import { numberAsCurrency } from '../../utils/numberAsCurrency'
import { accountName } from '../../utils/accountName'

import { Account } from '@types'

type Props = {
  account: Account
}

export const AccountCard: FC<Props> = ({ account }) => {
  const balance = numberAsCurrency(account.balance)
  const [wholeNumOfBal, decimal] = balance.split('.')

  return (
    <Link to={account.uuid} key={account.uuid}>
      <div
        className={clsx(
          'flex w-64 scale-100 flex-col items-center justify-center gap-1 rounded-md bg-white p-4 drop-shadow-md',
          'cursor-pointer transition-all hover:scale-[102%] active:scale-[98%]'
        )}
      >
        <p className="text-sm font-light">{accountName(account)}</p>
        <p className="text-center text-xl font-semibold">
          <span>{wholeNumOfBal}</span>
          <span className="text-sm font-normal text-grey-500">.{decimal}</span>
        </p>
      </div>
    </Link>
  )
}
