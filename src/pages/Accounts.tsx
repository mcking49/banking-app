import { useEffect, type FC } from 'react'

import { useAccountsQuery, useMeQuery } from '../app/api'
import { useAppDispatch } from '../app/hooks'
import { setPageTitle } from '../app/slices/pageTitleSlice'

import { AccountSummaryCard } from '@components/cards'
import { AccountCardSkeleton } from '@components/loading'

const Accounts: FC = () => {
  const dispatch = useAppDispatch()
  const { data: user } = useMeQuery(null)
  const { data: accounts } = useAccountsQuery({ userId: user!.uuid }, {})

  useEffect(() => {
    dispatch(setPageTitle('Accounts'))
  }, [])

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {accounts ? (
        accounts.map((account, index) => (
          <div
            key={account.uuid}
            className="staggered-item"
            style={{ ['--animation-order' as string]: index.toString() }}
          >
            <AccountSummaryCard account={account} />
          </div>
        ))
      ) : (
        <AccountCardSkeleton />
      )}
    </div>
  )
}

export default Accounts
