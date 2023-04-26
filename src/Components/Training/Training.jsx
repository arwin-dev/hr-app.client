import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../Auth/auth';
import { useNavigate } from 'react-router-dom';

export const Training = () => {
    const [trainings, setTrainings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(process.env.REACT_APP_API + 'training/getTraining', {
                    params: { empID: auth.empID }
                });
                setTrainings(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [auth.empID]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const createTraining = (e) =>{
        navigate('createtraining');
    }

    const addTraining = (e) => {
        navigate('addtraining');
    }

    return (
        <div className='bg-white rounded-lg shadow-md w-full'>
            <div className='flex items-center justify-between bg-gray-200 px-4 py-3 rounded-t-lg'>
                <h1 className='text-xl font-bold text-gray-800'>Training</h1>
                <div>
                    {auth.manager && (<button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 mr-3 rounded-md transition-colors duration-200 ease-in-out" onClick={createTraining}>Create New Training</button> )}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded-md transition-colors duration-200 ease-in-out" onClick={addTraining}>Add Training</button>
                </div>
            </div>
            <div className='w-[90%] mx-auto overflow-x-auto'>
                <table className="w-full whitespace-no-wrap bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                    <thead className="text-white">
                        <tr className="bg-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-4 text-left">Training Name</th>
                            <th className="py-3 px-4 text-left">Mode</th>
                            <th className="py-3 px-4 text-left">Start Date</th>
                            <th className="py-3 px-4 text-left">Completion Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {trainings.map(training => (
                            <tr key={training.Name}>
                                <td className="py-3 px-4 border-b border-gray-200">{training.Name}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{training.Mode}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{formatDate(training.Start_date)}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{formatDate(training.Completion_date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
