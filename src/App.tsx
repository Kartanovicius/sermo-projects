import React, { lazy, Suspense } from 'react'
// Contexts
import { useAuth } from './context/authContext'
import ColorModeProvider from './styles/ColorModeContext'
// Pages
import Dashboard from './pages/Dashboard'
import Profile from './pages/AccountSettings'
import Project from './pages/Project'
import ProjectMain from './pages/ProjectMain'
// react-router-dom
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute, { ProtectedRouteProps } from './helpers/protected-route'
// Constants
import * as ROUTES from './constants/routes'
// npm packages
import ReactLoading from 'react-loading'
import { Paper } from '@mui/material'

const Signin = lazy(() => import('./pages/Signin'))
const Signup = lazy(() => import('./pages/Signup'))
const Main = lazy(() => import('./pages/Main'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const { currentUser } = useAuth()
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: currentUser,
    authenticationPath: ROUTES.SIGN_IN,
  }

  return (
    <ColorModeProvider>
      {currentUser !== undefined && 
      <Suspense fallback={
        <Paper sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <ReactLoading type='spinningBubbles' color='#1875d2' height={'10%'} width={'10%'}/>
        </Paper>
      }>
        <Routes>
          <Route path={ROUTES.SIGN_IN} element={
            <ProtectedRoute
            isAuthenticated={!currentUser}
            authenticationPath={ROUTES.MAIN}
            outlet={<Signin />}
            />
          }/>

          <Route path={ROUTES.SIGN_UP} element={
            <ProtectedRoute
            isAuthenticated={!currentUser}
            authenticationPath={ROUTES.MAIN}
            outlet={<Signup />}
            />
          }/>
          
          <Route path={ROUTES.MAIN} element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Main />}
            />
          }>
            <Route path={ROUTES.MAIN} element={<Dashboard />}/>
            <Route path={ROUTES.ACCOUNTSETTINGS} element={<Profile />}/>
            <Route path={ROUTES.PROJECT+':project_code'} element={<Project />}>
              <Route path={ROUTES.PROJECT+':project_code'} element={<ProjectMain />}/>
            </Route>
          </Route>

          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />

        </Routes>
      </Suspense>}
    </ColorModeProvider>
  )
}

export default App
