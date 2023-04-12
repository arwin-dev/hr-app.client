import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
    return (
        <>
            <div className='navbar-play-container max-w-[180px]'>
                <div className={`w-[180px] duration-500 h-screen p-5 pt-8 bg-slate-900 relative md:w-30`}>
                    <div className='flex gap-x-4 items-center'>
                        <h1 className={`text-white origin-left font-medium text-xl duration-300`}>HR-APP</h1>
                    </div>
                    <nav className="pt-6 menu">
                        <NavLink
                            to={'/dashboard'}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900 rounded-md mt-2 menu-items`}>
                            <span className={` origin-left duration-200`}>
                                Dashboard
                            </span>
                        </NavLink>

                        <NavLink
                            to=''
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900 rounded-md mt-2 menu-items`} >
                            <span className={` origin-left duration-200`}>
                                Ideas
                            </span> 
                        </NavLink>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar



{/* <nav className="flex justify-between">
<div>
  <NavLink to='/dashboard'>Dashboard</NavLink>
</div>
<div>
  <NavLink to=''>Home</NavLink>
</div>
</nav> */}