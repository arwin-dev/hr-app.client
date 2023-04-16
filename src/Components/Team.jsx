import React, { useEffect, useState } from 'react';

export function Team() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = process.env.REACT_APP_API+'employee';
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setEmployees(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen">Error: {error.message}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md w-full">
      <div className='flex items-center justify-between bg-gray-200 px-4 py-3 rounded-t-lg'>
        <h1 className='text-xl font-bold text-gray-800'>Team</h1>
      </div>
      <div className='m-5'>
        <div className='grid grid-cols-3 gap-6 mx-auto px-3'>
          {employees.map(employee => (
            <div key={employee.Employee_ID} className="rounded overflow-hidden shadow-lg" style={{ height: '150px' }}>
            <div className="px-4 py-2">
              <div className="font-bold text-lg mb-2">{`${employee.First_name} ${employee.Last_name}`}</div>
              <p className="text-gray-700 text-base">{employee.Email}</p>
              <p className="text-gray-700 text-base">{employee.Phone_number}</p>
            </div>
          </div>      
          ))}
        </div>
      </div>
    </div>
  );
}
