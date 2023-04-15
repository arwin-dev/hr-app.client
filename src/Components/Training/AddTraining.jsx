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
        axios.get(process.env.REACT_APP_API+'training')
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

        const response = await axios.post(process.env.REACT_APP_API+'training/add', training);

        console.log('Training added successfully!', response.data);
        navigate('/training');
        } catch (error) {
            alert('Error Adding Training');
            console.error('Error adding training:', error);
        }
    };

    const handleCancel = (event) => {
        navigate('/training');
    };

    return (
        <div className='w-full'>
            <div className='h-[40px] flex justify-between items-center bg-[#a8a29e] pb-1 px-4'>
                    <h1 className='text-2xl text-[#172554] font-bold '>Add Training</h1>
            </div>
            <form onSubmit={handleSubmit} className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="start-date">
                        Start date:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="completion-date">
                        Completion date:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="completion-date"
                        type="date"
                        value={completionDate}
                        onChange={(e) => setCompletionDate(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="training-id">
                        Training ID:
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="training-id"
                        value={trainingId}
                        onChange={(e) => setTrainingId(e.target.value)}
                        required
                        >   
                        <option value="">Select Training ID</option>
                        {trainingOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center">
                    <button
                        onClick={handleCancel}
                        className="bg-red-500 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Training
                    </button>
                    
                </div>
            </form>
        </div>
    );
};

export default AddTraining;
