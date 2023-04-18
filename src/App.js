import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {Login} from './Components/Auth/Login';
import { AuthProvider } from './Components/Auth/auth';
import RequireAuth from './Components/Auth/RequireAuth';
import {Navbar} from './Components/Navbar';
import { Training } from './Components/Training/Training';
import { About } from './Components/About/About';
import {Team} from './Components/Team';
import AddTraining from './Components/Training/AddTraining';
import NoMatch from './Components/NoMatch';
import { Leaves } from './Components/Leave/Leaves';
import {Jobs} from './Components/Jobs'
import { RequestLeave } from './Components/Leave/RequestLeave';
import { Dashboard } from './Components/Dashboard';
import { CreateTraining } from './Components/Training/CreateTraining';

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className={location.pathname === '/login' ? '' : 'flex'}>
        {location.pathname !== '/login' && <Navbar />}
        <Routes>
          <Route path='login' element={< Login />}/>

          <Route path='dashboard' element={ <RequireAuth> <Dashboard/> </RequireAuth> }/>

          <Route path='team' element={<RequireAuth> <Team/> </RequireAuth>} />

          <Route path='training' element={<RequireAuth> <Training/> </RequireAuth>} />
          <Route path='training/createTraining' element={<RequireAuth> <CreateTraining/> </RequireAuth>} />
          <Route path='training/addtraining' element={ <RequireAuth> <AddTraining/> </RequireAuth> }/>

          <Route path='timeoff' element={<RequireAuth> <Leaves/> </RequireAuth>}/>
          <Route path='timeoff/requesttimeoff' element={<RequireAuth> <RequestLeave/> </RequireAuth>}/>

          <Route path="jobs" element={<RequireAuth> <Jobs/> </RequireAuth>}/>

          <Route path='about' element={<RequireAuth> <About/> </RequireAuth>}/>

          <Route path='*' element={ <RequireAuth> <NoMatch/> </RequireAuth> }/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
