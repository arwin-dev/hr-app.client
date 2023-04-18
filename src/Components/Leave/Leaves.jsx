import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../Auth/auth';
import { useNavigate } from 'react-router-dom';

export const Leaves = () => {
    const [leaves, setLeaves] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false); 
    const [error, setError] = useState(null); 
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(process.env.REACT_APP_API + 'leaves', {
                    params: { empID: auth.empID }
                });
                setLeaves(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [auth.empID]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const totalDays = leaves.reduce((acc, leave) => acc + leave.Number_of_days, 0);
    const pto = leaves[0].PTO;

    const addLeaves = async (e) => {
        if (totalDays < pto) {
            navigate('requesttimeoff', { state: { totalDays, pto } });
        } else {
            setShowPopup(true);
        }
    }
    
    return (
        <div className='bg-white rounded-lg shadow-md w-full'>
            {showPopup &&
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
            }
            {showPopup &&
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 z-20">
                    <h1 className='text-2xl text-red-500 font-bold '>Error</h1>
                    <p className="pt-4 mb-3 pb-2">You have exceeded your PTO limit.</p>
                    <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Cancel</button>
                </div>
            }
        <div className='flex items-center justify-between bg-gray-200 px-4 py-3 rounded-t-lg'>
            <h1 className='text-xl font-bold text-gray-800'>Time Off</h1>
            <button onClick={addLeaves} className='text-red-800 hover:text-red-500 mr-3' >Request Time Off </button>
        </div>
        <div className='w-[90%] mx-auto overflow-x-auto'>
        <table className="w-full whitespace-no-wrap bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead className="text-white">
                <tr className="bg-gray-700 uppercase text-sm leading-normal">
                    <th scope="col" className="py-3 px-4 text-left">Leave_ID</th>
                    <th scope="col" className="py-3 px-4 text-left">Number Of Days</th>
                    <th scope="col" className="py-3 px-4 text-left">Reason</th>
                </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                {leaves.map(leave => (
                    <tr key={leave.Leave_ID}>
                    <td className="py-3 px-4 border-b border-gray-200">{leave.Leave_ID}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{leave.Number_of_days}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{leave.Reason}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h1 className='pt-4 text-md'>Total Time Off: {totalDays}</h1>
            <h1 className='text-md'>Time Off available: {pto - totalDays}</h1>
        </div>
        </div>
    )
}
