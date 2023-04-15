import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/auth';

export const About = () => {
  const [about, setAbout] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API + 'employee/getempdetails',
          {
            params: { empID: auth.empID },
          }
        );
        setAbout(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [auth.empID]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md w-full">
      <div className='flex items-center justify-between bg-gray-200 px-4 py-3 rounded-t-lg'>
        <h1 className='text-xl font-bold text-gray-800'>About</h1>
      </div>
      {about.map((employee, index) => (
        <div key={index} className="employee-card bg-white rounded-md p-4 mb-4">
          <h3 className="text-2xl font-bold mb-2">
            {employee.First_name} {employee.Last_name}
          </h3>
          <p className="mb-2">
            <strong>Email:</strong> {employee.Email}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {employee.Phone_number}
          </p>
          <p className="mb-2">
            <strong>Title:</strong> {employee.Title}
          </p>
          <p>
            <strong>Description:</strong> {employee.Description}
          </p>
        </div>
      ))}
    </div>
  );
};
