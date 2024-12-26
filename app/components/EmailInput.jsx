'use client'
import React from 'react';

const EmailInput = ({ value, onChange, error }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700">Email:</label>
      <input
        type="email"
        id="email"
        value={value}
        onChange={handleChange}
        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your email"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default EmailInput;
