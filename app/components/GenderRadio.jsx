'use client'
import React, { useState } from 'react';

const GenderRadio = ({ onChange }) => {
  const [selectedGender, setSelectedGender] = useState('');

  const handleChange = (e) => {
    setSelectedGender(e.target.value);
    onChange(e.target.value); 
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700">Gender:</label>
      <div className="flex items-center mt-2">
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          onChange={handleChange}
          checked={selectedGender === 'male'}
          className="mr-2"
        />
        <label htmlFor="male">Male</label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          onChange={handleChange}
          checked={selectedGender === 'female'}
          className="mr-2"
        />
        <label htmlFor="female">Female</label>
      </div>
      <div className="flex items-center"> 
        <input
          type="radio"
          id="other"
          name="gender"
          value="other"
          onChange={handleChange}
          checked={selectedGender === 'other'}
          className="mr-2"
        />
        <label htmlFor="other">Other</label> 
      </div>
      {!selectedGender && <p className="text-red-500 text-sm mt-2">Please select a gender.</p>}
    </div>
  );
};

export default GenderRadio;