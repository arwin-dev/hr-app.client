import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/auth';

const AddTraining = () => {
    const [startDate, setStartDate] = useState('');
    const [completionDate, setCompletionDate] = useState('');
    const [trainingId, setTrainingId] = useState('');

    const navigate = useNavigate();
    const auth = useAuth();

    const [trainingOptions, setTrainingOptions] = useState([]);


    useEffect(() => {
        axios.get(process.env.REACT_APP_API+'training',{
          params: { empID: auth.empID },
        })
        .then(respone => {
            setTrainingOptions(respone.data.map(Training => ({value:Training.Training_ID, label: Training.Name})))
        })
        .catch(error => console.log(error));
    });
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

        const training = {
            Start_date: startDate,
            Completion_date: completionDate,
            Employee_ID: auth.empID,
            Training_ID: trainingId
        };

        await axios.post(process.env.REACT_APP_API+'training/add', training);

        alert('Training added successfully');
        navigate('/training');
        } catch (error) {
            alert('Error Adding Training');
        }
    };

    const handleCancel = (event) => {
        navigate('/training');
    };

    return (
<div className="bg-white rounded-lg shadow-md w-full">
  <div className="flex items-center justify-between bg-gray-200 px-4 py-3 rounded-t-lg">
    <h1 className="text-xl font-bold text-gray-800">Add Training</h1>
  </div>
  <form onSubmit={handleSubmit} className="px-6 py-4">
    <div className="mb-4">
      <label htmlFor="start-date" className="block font-semibold text-gray-800 mb-2">
        Start date:
      </label>
      <input
        id="start-date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border border-gray-400 rounded-lg px-3 py-2 w-full text-gray-800"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="completion-date" className="block font-semibold text-gray-800 mb-2">
        Completion date:
      </label>
      <input
        id="completion-date"
        type="date"
        value={completionDate}
        onChange={(e) => setCompletionDate(e.target.value)}
        className="border border-gray-400 rounded-lg px-3 py-2 w-full text-gray-800"
        required
      />
    </div>
    <div className="mb-4">
      <label htmlFor="training-id" className="block font-semibold text-gray-800 mb-2">
        Training Course:
      </label>
      <select
        id="training-id"
        value={trainingId}
        onChange={(e) => setTrainingId(e.target.value)}
        className="border border-gray-400 rounded-lg px-3 py-2 w-full text-gray-800"
        required
      >
        <option value="">Select Training Course</option>
        {trainingOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    <div className="flex justify-end">
      <button
        type="button"
        onClick={handleCancel}
        className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg mr-2 focus:outline-none focus:shadow-outline"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
      >
        Add Training
      </button>
    </div>
  </form>
</div>

    );
};

export default AddTraining;
