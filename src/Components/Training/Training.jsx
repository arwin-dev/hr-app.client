import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../Auth/auth';

export const Training = () => {
    const [trainings, setTrainings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 
    const auth = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(process.env.REACT_APP_API + 'training', {
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='w-full h-screen'>
        <div className='h-[40px] flex justify-between items-center bg-[#a8a29e] pb-1 px-4'>
            <h1 className='text-2xl text-[#172554] font-bold '>Training</h1>
            <button className='' > Add Training </button>
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
                    <td className="border px-4 py-2">{training.Start_date}</td>
                    <td className="border px-4 py-2">{training.Completion_date}</td>
                    <td className="border px-4 py-2">{training.Score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}
