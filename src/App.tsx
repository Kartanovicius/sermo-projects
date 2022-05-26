import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './context/authContext'
import * as ROUTES from './constants/routes'
import ProtectedRoute, { ProtectedRouteProps } from './helpers/protected-route';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

const Signin = lazy(() => import('./pages/Signin'))
const Signup = lazy(() => import('./pages/Signup'))
const Main = lazy(() => import('./pages/Main'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const { currentUser } = useAuth()
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: currentUser,
    authenticationPath: ROUTES.SIGN_IN,
  };
  
  return (
    <>
      {currentUser !== undefined && 
      <Suspense>
        <Routes>
          <Route path={ROUTES.SIGN_IN} element={<Signin />} />
          <Route path={ROUTES.SIGN_UP} element={<Signup />} />
          <Route path={ROUTES.MAIN} element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Main />}
            />
          }>
            <Route path={ROUTES.MAIN} element={<Dashboard />}/>
            <Route path={ROUTES.PROFILE+':userid'} element={<Profile />}/>
          </Route>
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </Suspense>}
    </>
  );
}

export default App;
