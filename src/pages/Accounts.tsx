import { FC, useEffect } from 'react'
import { clsx } from 'clsx'
import { Link } from 'react-router-dom'

import { useAccountsQuery, useMeQuery } from '../app/api'
import { useAppDispatch } from '../app/hooks'
import { setPageTitle } from '../app/slices/pageTitleSlice'
import { numberAsCurrency } from '../utils/numberAsCurrency'

import { Account } from '@types'

const Accounts: FC = () => {
  const dispatch = useAppDispatch()
  const { data: user } = useMeQuery(null)
  const { data: accounts } = useAccountsQuery({ userId: user!.uuid }, {})

  const accountName = (account: Account) => {
    if (account.name) {
      return account.name
    }

    return account.type.charAt(0).toUpperCase() + account.type.slice(1)
  }

  useEffect(() => {
    dispatch(setPageTitle('Accounts'))
  }, [])

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {accounts?.map((account) => {
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
      })}
    </div>
  )
}

export default Accounts
