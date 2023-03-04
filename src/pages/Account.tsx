import { useEffect, type FC } from 'react'
import { useParams } from 'react-router-dom'

import { useAccountQuery } from '../app/api'
import { useAppDispatch } from '../app/hooks'
import { setPageTitle } from '../app/slices/pageTitleSlice'
import { AccountCardSkeleton } from '../components/loading'
import { accountName } from '../utils/accountName'

import { AccountBalanceCard, TransactionsCard } from '@components/cards'

const Account: FC = () => {
  const dispatch = useAppDispatch()
  const { accountId } = useParams<{ accountId: string }>()
  const { data: account } = useAccountQuery({ accountId: accountId! })

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
      {account ? <AccountBalanceCard balance={account.balance} /> : <AccountCardSkeleton />}
      {accountId && <TransactionsCard accountId={accountId} />}
    </div>
  )
}

export default Account
