import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthProvider from './context/authContext'
import * as ROUTES from './constants/routes'

const Signin = lazy(() => import('./pages/Signin'))
const Signup = lazy(() => import('./pages/Signup'))
const Main = lazy(() => import('./pages/Main'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path={ROUTES.SIGN_IN} element={<Signin />} />
            <Route path={ROUTES.SIGN_UP} element={<Signup />} />
            <Route path={ROUTES.MAIN} element={<Main />}/>
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
