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

    const addTraining = async (e) => {
        navigate('addtraining')
    }

    return (
        <div className='bg-white rounded-lg shadow-md w-full'>
        <div className='flex items-center justify-between bg-gray-200 px-4 py-3 rounded-t-lg'>
            <h1 className='text-xl font-bold text-gray-800'>Training</h1>
            <button onClick={addTraining} className='text-red-800 hover:text-red-500 mr-3' > Add Training </button>
        </div>
        <div className='w-fit container mx-auto p-6'>
            <table className="table-auto w-full border-solid border-2 ">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Mode</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Start Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Completion Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Score</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {trainings.map(training => (
                    <tr key={training.Name}>
                    <td className="border px-4 py-2">{training.Name}</td>
                    <td className="border px-4 py-2">{training.Mode}</td>
                    <td className="border px-4 py-2">{formatDate(training.Start_date)}</td>
                    <td className="border px-4 py-2">{formatDate(training.Completion_date)}</td>
                    <td className="border px-4 py-2">{training.Score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}
