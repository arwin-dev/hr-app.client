import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateTraining = () => {
  const [name, setName] = useState('');
  const [mode, setMode] = useState('');
  const navigate = useNavigate();

  const handleCancel = (e) => {
    navigate('/training');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const training = {
        Name: name,
        Mode: mode,
      };

      await axios.post(process.env.REACT_APP_API + 'training/createtraining', training);

      navigate('/training');
    } catch (error) {
      alert('Error creating training');
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl text-gray-800 font-bold mb-6">Create New Training</h1>
            <form onSubmit={handleSubmit} >
              <div className="mb-4">
                <label 
                  htmlFor="name" 
                  className="block text-gray-700 font-bold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  />
              </div>
              <div className="my-6">
                <label htmlFor="mode" className="block text-gray-700 font-bold mb-2">
                  Mode:
                </label>
                <select
                  id="mode"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  required
                  className="border border-gray-400 rounded-lg px-3 py-2 w-full text-gray-800"
                  >
                  <option value="">--Please choose a mode--</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="In-person">In-person</option>
                  <option value="Virtual">Virtual</option>
                </select>
              </div>
              <div className="my-6">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

  );
};
