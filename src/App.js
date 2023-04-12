import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Login} from './Components/Login';
import EmployeeList from './Components/EmployeeList'
import { AuthProvider } from './Components/auth';
import RequireAuth from './Components/RequireAuth';
import Navbar from './Components/Navbar';
import NoMatch from './Components/NoMatch';

function App() {
  return (
    
    <AuthProvider>
      <>
        <Navbar/>
        <Routes>
          <Route path='login' element={< Login />}/>
          <Route path='dashboard' element={ <RequireAuth>< EmployeeList /></RequireAuth> }/>
          <Route path='*' element={ <NoMatch/> }/>
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;