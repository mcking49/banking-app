import { FC, PropsWithChildren, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

type Props = {
  isAllowed: boolean
  redirectPath: string
} & PropsWithChildren

const ProtectedRoute: FC<Props> = ({ children, isAllowed, redirectPath }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAllowed) {
      navigate(redirectPath)
    }
  }, [isAllowed])

  if (!isAllowed) {
    return null
  }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute
