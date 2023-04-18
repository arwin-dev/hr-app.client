import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from './Auth/auth'


export const Navbar = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const handleLogout = () => {
        auth.logout()
        navigate('login')
    }

    return (
        <>
            <div className='navbar-play-container max-w-[180px]'>
                <div className={`w-[180px] duration-500 h-screen p-5 pt-8 bg-slate-900 relative md:w-30`}>
                    <div className='flex gap-x-4 items-center'>
                        <h1 className={`text-white origin-left font-medium text-xl duration-300`}>HR-APP</h1>
                    </div>
                    <div className='flex gap-x-4 items-center pt-4'>
                        <h1 className={`text-white origin-left text-sm duration-300`}>Welcome, {auth.user}</h1>
                    </div>
                    <nav className="pt-6 menu">
                        <NavLink
                            to={'/dashboard'}
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900  mt-2 menu-items`}>
                            <span className={` origin-left duration-200`}>
                                Dashboard
                            </span>
                        </NavLink>

                    {auth.manager && (
                        <NavLink
                            to={'/team'}
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900  mt-2 menu-items`}
                        >
                            <span className={` origin-left duration-200`}>Team</span>
                        </NavLink>
                    )}

                        <NavLink
                            to='/training'
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900  mt-2 menu-items`} >
                            <span className={` origin-left duration-200`}>
                                Training
                            </span> 
                        </NavLink>

                        <NavLink
                            to='/timeoff'
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900  mt-2 menu-items`} >
                            <span className={` origin-left duration-200`}>
                                Time Off
                            </span> 
                        </NavLink>

                        <NavLink
                            to='/jobs'
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900  mt-2 menu-items`} >
                            <span className={` origin-left duration-200`}>
                                Jobs
                            </span> 
                        </NavLink>

                        <NavLink
                            to='/about'
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900  mt-2 menu-items`} >
                            <span className={` origin-left duration-200`}>
                                About
                            </span> 
                        </NavLink>

                        <div className='flex  rounded-md p-2 cursor-pointer font-bold hover:bg-light-white text-[#dc2626] text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900  mt-2 menu-items'>
                            <button className='w-full flex ' onClick={handleLogout} >
                                Logout
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

