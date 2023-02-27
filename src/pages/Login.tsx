import type { FC } from 'react'

import { useLoginMutation } from '../app/api'

const Login: FC = () => {
  const [login] = useLoginMutation()

  const handleLogin = () => {
    login({
      password: '121212',
      username: 'johndoe',
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
