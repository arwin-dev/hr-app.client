import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {Login} from './Components/Login';
import EmployeeList from './Components/EmployeeList'
import { AuthProvider } from './Components/auth';
import RequireAuth from './Components/RequireAuth';
import Navbar from './Components/Navbar';
import NoMatch from './Components/NoMatch';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className={location.pathname === '/login' ? '' : 'flex'}>
        {location.pathname !== '/login' && <Navbar />}
        <Routes>
          <Route path='login' element={< Login />}/>
          <Route path='dashboard' element={ <RequireAuth>< EmployeeList /></RequireAuth> }/>
          <Route path='*' element={ <RequireAuth> <NoMatch/> </RequireAuth> }/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
