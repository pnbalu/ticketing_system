import { Navigate, Route, Routes } from 'react-router-dom'
import WorkspaceLayout from './layouts/WorkspaceLayout'
import HomePage from './pages/HomePage'
import IncidentsPage from './pages/IncidentsPage'
import RequestsPage from './pages/RequestsPage'
import ChangesPage from './pages/ChangesPage'
import KnowledgePage from './pages/KnowledgePage'
import UsersPage from './pages/UsersPage'
import ApproversPage from './pages/ApproversPage'
import SettingsPage from './pages/SettingsPage'
import AuthLayout from './pages/auth/AuthLayout'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import { useApplyLayout } from './hooks/useLayoutEffect'

function App() {
  useApplyLayout()

  return (
    <Routes>
      <Route path="/" element={<WorkspaceLayout />}>
        <Route index element={<HomePage />} />
        <Route path="incidents" element={<IncidentsPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="changes" element={<ChangesPage />} />
        <Route path="knowledge" element={<KnowledgePage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="approvers" element={<ApproversPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
