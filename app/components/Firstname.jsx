'use client'
import React, { useState } from 'react';

const FirstNameInput = ({ value, onChange, error }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    
    if (/^[A-Za-z\s]*$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="firstName" className="block text-gray-700">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={value}
        onChange={handleChange}
        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your first name"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default FirstNameInput;
