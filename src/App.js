import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {Login} from './Components/Auth/Login';
import EmployeeList from './Components/EmployeeList'
import { AuthProvider } from './Components/Auth/auth';
import RequireAuth from './Components/Auth/RequireAuth';
import {Navbar} from './Components/Navbar';
import { Training } from './Components/Training/Training';
import { About } from './Components/About/About';
import AddTraining from './Components/Training/AddTraining';
import NoMatch from './Components/NoMatch';
import { Leaves } from './Components/Leave/Leaves';
import { RequestLeave } from './Components/Leave/RequestLeave';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className={location.pathname === '/login' ? '' : 'flex'}>
        {location.pathname !== '/login' && <Navbar />}
        <Routes>
          <Route path='login' element={< Login />}/>

          <Route path='dashboard' element={ <RequireAuth>< EmployeeList /></RequireAuth> }/>

          <Route path='training' element={<RequireAuth> <Training/> </RequireAuth>} />
          <Route path='training/addtraining' element={ <RequireAuth> <AddTraining/> </RequireAuth> }/>

          <Route path='leaves' element={<RequireAuth> <Leaves/> </RequireAuth>}/>
          <Route path='leaves/requestleave' element={<RequireAuth> <RequestLeave/> </RequireAuth>}/>

          <Route path='about' element={<RequireAuth> <About/> </RequireAuth>}/>

          <Route path='*' element={ <RequireAuth> <NoMatch/> </RequireAuth> }/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
