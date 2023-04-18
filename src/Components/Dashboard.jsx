import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './Auth/auth';



export const Dashboard = () => {
    const auth = useAuth();

  return (
    <div className='w-full h-[600px]'>
        <div className='flex items-center justify-between bg-gray-200 px-4 py-3 rounded-t-lg'>
            <h1 className='text-xl font-bold text-gray-800'>Dashboard</h1>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center w-full h-[50%]">
            {auth.manager && (
                <NavLink
                    to={'/team'}
                    className="flex items-center justify-center w-[180px] px-6 py-4 text-lg font-medium text-gray-900 bg-yellow-500 rounded-md shadow-md hover:bg-yellow-600"
                >
                    Team
                </NavLink>
            )}

            <NavLink
                to='/training'
                className="flex items-center justify-center w-[180px] px-6 py-4 text-lg font-medium text-gray-900 bg-green-500 rounded-md shadow-md hover:bg-green-600"
            >
                Training
            </NavLink>

            <NavLink
                to='/timeoff'
                className="flex items-center justify-center w-[180px] px-6 py-4 text-lg font-medium text-gray-900 bg-red-500 rounded-md shadow-md hover:bg-red-600"
            >
                Time Off
            </NavLink>

            <NavLink
                to='/jobs'
                className="flex items-center justify-center w-[180px] px-6 py-4 text-lg font-medium text-gray-900 bg-sky-500 rounded-md shadow-md hover:bg-sky-600"
            >
                Jobs
            </NavLink>

            <NavLink
                to='/about'
                className="flex items-center justify-center w-[180px] px-6 py-4 text-lg font-medium text-gray-900 bg-purple-500 rounded-md shadow-md hover:bg-purple-600"
            >
                About
            </NavLink>
        </div>
    </div>


  )
}

//benjilee
//b6k8UqhdJsMz