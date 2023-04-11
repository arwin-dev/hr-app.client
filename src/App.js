import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Login} from './Components/Login';
import EmployeeList from './Components/EmployeeList'
import { AuthProvider } from './Components/auth';
import RequireAuth from './Components/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='login' element={< Login />}/>
        <Route path='dashboard' element={ <RequireAuth>< EmployeeList /></RequireAuth> }/>
      </Routes>
    </AuthProvider>
  );
}

export default App;