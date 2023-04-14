import React, { useEffect, useState } from 'react';

function EmployeeList() {
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
    <div className="w-fit container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <table className="table-auto w-full ">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone number</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.Employee_ID}>
              <td className="border px-4 py-2">{employee.Employee_ID}</td>
              <td className="border px-4 py-2">{`${employee.First_name} ${employee.Last_name}`}</td>
              <td className="border px-4 py-2">{employee.Email}</td>
              <td className="border px-4 py-2">{employee.Phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
