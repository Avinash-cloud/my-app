'use client'
import React, { useState } from 'react';

const LastNameInput = ({ value, onChange, error }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    
    if (/^[A-Za-z\s]*$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="lastName" className="block text-gray-700">Last Name:</label>
      <input
        type="text"
        id="lastName"
        value={value}
        onChange={handleChange}
        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your last name"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default LastNameInput;
