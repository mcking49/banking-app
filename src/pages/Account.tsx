import { useEffect, type FC } from 'react'
import { useParams } from 'react-router-dom'

import { useAccountQuery } from '../app/api'
import { useAppDispatch } from '../app/hooks'
import { setPageTitle } from '../app/slices/pageTitleSlice'
import { accountName } from '../utils/accountName'

const Account: FC = () => {
  const dispatch = useAppDispatch()
  const { accountId } = useParams<{ accountId: string }>()
  const { data: account } = useAccountQuery({ accountId: accountId! })

  useEffect(() => {
    if (account) {
      dispatch(setPageTitle(accountName(account)))
    }
  }, [account])

  return <div>Account</div>
}

export default Account
