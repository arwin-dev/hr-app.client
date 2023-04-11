import React, {useState} from 'react'
import axios from 'axios';
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
        username: username,
        password: password
        };
        const url = 'https://localhost:7129/login';
        axios.post(url, data)
        .then((response) => {
            if (response.status === 200) 
            {
                alert('LOGIN SUCCESS');
                auth.login(username,response.data)
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
        <form onSubmit={handleSubmit}>
            
            <label htmlFor="Username">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder='your username' id='username' name='username'/>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='*******' id='password' name='password'/>
            <button type='submit'>Log In</button>
        </form>
    )
}