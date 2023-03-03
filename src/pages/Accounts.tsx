import { FC, useEffect } from 'react'

import { useAppDispatch } from '../app/hooks'
import { setPageTitle } from '../app/slices/pageTitleSlice'

const Accounts: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setPageTitle('Accounts'))
  }, [])
  return <div>Accounts</div>
}

export default Accounts
