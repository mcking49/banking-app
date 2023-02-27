import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { useMeQuery } from './app/api'
import Accounts from './pages/Accounts'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import Transactions from './pages/Transactions'

const App: FC = () => {
  const { data: user } = useMeQuery(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard/accounts" />} />

        {/* User must be logged IN to access routes */}
        <Route element={<ProtectedRoute isAllowed={!!user} redirectPath="/login" />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="accounts" element={<Accounts />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
        </Route>

        {/* User must be logged OUT to access routes */}
        <Route element={<ProtectedRoute isAllowed={!user} redirectPath="/dashboard/accounts" />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
