import type { FC } from 'react'

import { useLogoutMutation } from '../app/api'

const Dashboard: FC = () => {
  const [logout] = useLogoutMutation()

  const onClickLogout = () => {
    logout(null)
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => onClickLogout()}>logout</button>
    </div>
  )
}

export default Dashboard
