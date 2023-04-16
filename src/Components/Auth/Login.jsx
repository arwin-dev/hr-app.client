import React, {useState} from 'react'
import axios from 'axios';
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const isManager = (empID) => {
        axios.get(process.env.REACT_APP_API + 'employee/managercheck', {
          params: { empID: empID }
        })
          .then(response => {
            let status = response.data[0].result
            if(status === 1)
            {
                auth.managerAuth();
            }
            //console.log(response.data[0].result);
          })
          .catch(error => {
            console.error(error);
          });
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
        username: username,
        password: password
        };
        const url = process.env.REACT_APP_API+'login';
        axios.post(url, data)
        .then((response) => {
            if (response.status === 200) 
            {
                auth.login(username,response.data);
                isManager(response.data);
                navigate('/dashboard')
            } else 
            {
                alert(response.data);
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) 
            {
                alert('Invalid username or password');
            } 
            else 
            {
                alert('Error logging in');
            }
        });       
    }
 
    return (
        <div className='h-screen flex bg-slate-900'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primary Border shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Log in to your account 🔐
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Username">Username</label>
                        <input 
                            value={username} 
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            onChange={(e) => setUsername(e.target.value)} 
                            type="username" 
                            placeholder='your username' 
                            id='username' 
                            name='username'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            value={password} 
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            placeholder='*******' 
                            id='password' 
                            name='password'
                            required
                        /> 
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <button
                            onSubmit={handleSubmit} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

