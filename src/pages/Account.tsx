import { useEffect, type FC } from 'react'

import { useAppDispatch } from '../app/hooks'
import { setPageTitle } from '../app/slices/pageTitleSlice'

const Account: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setPageTitle('Name of account'))
  }, [])

  return <div>Account</div>
}

export default Account
