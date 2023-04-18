import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from './Auth/auth';


export const Jobs = () => {
    const [jobsData, setJobsData] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API +'jobs')
            .then(response => {
                setJobsData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between bg-gray-200 px-4 py-3 rounded-t-lg'>
                <h1 className='text-xl font-bold text-gray-800'>Jobs</h1>
            </div>
            <div className="w-[90%] mx-auto overflow-x-auto">
            <table className="w-full whitespace-no-wrap bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                <thead className="text-white">
                    <tr className="bg-gray-700 uppercase text-sm leading-normal">
                        <th scope="col" className="py-3 px-4 text-left">
                            Job ID
                        </th>
                        <th scope="col" className="py-3 px-4 text-left">
                            Title
                        </th>
                        <th scope="col" className="py-3 px-4 text-left">
                            Description
                        </th>
                        <th scope="col" className="py-3 px-4 text-left">
                            PTO
                        </th>
                        { auth.manager && (
                        <th scope="col" className="py-3 px-4 text-left">
                            Salary
                        </th>
                        )}
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {jobsData.map(job => (
                        <tr key={job.Job_ID}>
                            <td className="py-3 px-4 border-b border-gray-200">
                                {job.Job_ID}
                            </td>
                            <td className="py-3 px-4 border-b border-gray-200">
                                {job.Title}
                            </td>
                            <td className="py-3 px-4 border-b border-gray-200">
                                {job.Description}
                            </td>
                            <td className="py-3 px-4 border-b border-gray-200">
                                {job.PTO}
                            </td>
                            {auth.manager && (
                                <td className="py-3 px-4 border-b border-gray-200">
                                    {job.Salary}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
}
