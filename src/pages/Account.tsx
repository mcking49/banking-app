import { useEffect, type FC } from 'react'
import { useParams } from 'react-router-dom'

import { useAccountQuery, useTransactionsQuery } from '../app/api'
import { useAppDispatch } from '../app/hooks'
import { setPageTitle } from '../app/slices/pageTitleSlice'
import { accountName } from '../utils/accountName'

const Account: FC = () => {
  const dispatch = useAppDispatch()
  const { accountId } = useParams<{ accountId: string }>()
  const { data: account } = useAccountQuery({ accountId: accountId! })
  const { data: transactions } = useTransactionsQuery({ accountId: accountId! })

  useEffect(() => {
    if (account) {
      dispatch(setPageTitle(accountName(account)))
    }
  }, [account])

  useEffect(() => {
    if (!account) {
      dispatch(setPageTitle(null))
    }
  }, [])

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {transactions
        ? transactions.map((transaction) => (
            <div key={transaction.uuid}>
              {transaction.payee}, {transaction.amount}
            </div>
          ))
        : null}
    </div>
  )
}

export default Account
