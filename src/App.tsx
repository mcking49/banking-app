import { FC, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useMeQuery } from './app/api'
import Account from './pages/Account'
import Accounts from './pages/Accounts'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'

import { SpinnerOverlay } from '@components/loading'

const App: FC = () => {
  const { data: user, isLoading } = useMeQuery(null)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  useEffect(() => {
    if (!isLoading && isFirstLoad) {
      setIsFirstLoad(false)
    }
  }, [isLoading])

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard/accounts" />} />

        {/* User must be logged IN to access routes */}
        <Route element={<ProtectedRoute isAllowed={!!user} redirectPath="/login" />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="accounts" element={<Accounts />} />
            <Route path="accounts/:accountId" element={<Account />} />
          </Route>
        </Route>

        {/* User must be logged OUT to access routes */}
        <Route element={<ProtectedRoute isAllowed={!user} redirectPath="/dashboard/accounts" />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

      <SpinnerOverlay isOpen={isFirstLoad} />

      <Toaster
        toastOptions={{
          error: {
            iconTheme: {
              primary: '#D64545',
              secondary: 'white',
            },
          },
          success: {
            iconTheme: {
              primary: '#57AE5B',
              secondary: 'white',
            },
          },
        }}
      />
    </>
  )
}

export default App
