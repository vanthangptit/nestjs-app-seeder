import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import About from './views/pages/about/about';
import Login from './views/pages/login/login';
import Home from './views/pages/home/home';
import NotFound from './views/pages/notFound/NotFound';
import Header from './views/components/header/header';
import { getAccessToken } from './utils/getAccessToken';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about.html'
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route path='/login.html' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function PrivateRoute({ children }) {
  const accessToken = getAccessToken();

  return accessToken ? children : <Navigate to='/login.html' replace />;
}