import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Auth/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const RequestLeave = () => {
    const [numberofdays, setNoOfDays] = useState('');
    const [reason, setReason] = useState('');
    const { state } = useLocation();
    const { totalDays, pto } = state || {};
    const auth = useAuth();
    const navigate = useNavigate();

    const handleCancel = (event) => {
        navigate('/timeoff');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try 
        {
            const totalLeaves = totalDays + parseInt(numberofdays);
            console.log(totalLeaves);
            if(totalLeaves > pto)
            {
                alert("PTO Limit Reached");
                return true;
            }
            const leave = {
                Number_of_days : numberofdays,
                Reason : reason,
                empID : auth.empID
            }    

            await axios.post(process.env.REACT_APP_API+'leaves/addleaves', leave)

            navigate('/timeoff');
        } catch (error) {
            alert('Error adding training');
            // console.error('Error adding training:', error);
        }
    };

    return (
        <div className="w-full flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl text-gray-800 font-bold mb-6">Leave Request</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="numberOfDays">
                            Number of Days
                        </label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="numberOfDays"
                            name="numberOfDays"
                            type="number"
                            placeholder="Enter number of days"
                            value={numberofdays}
                            onChange={(e) => setNoOfDays(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="reason">
                            Reason
                        </label>
                        <textarea
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="reason"
                            name="reason"
                            placeholder="Enter reason for leave"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button 
                        type='button'
                            onClick={handleCancel}
                            className="bg-gray-500 text-white px-4 py-2 mr-2 rounded hover:bg-gray-600">
                            Cancel
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
