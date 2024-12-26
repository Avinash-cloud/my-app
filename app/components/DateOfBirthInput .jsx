import React, { useState, useEffect } from 'react';

const DateOfBirthInput = ({ onChange }) => {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [age, setAge] = useState(''); // Use lowercase 'age' for consistency
  const today = new Date();
  const minAge = 14;
  const maxAge = 99;

  const handleDateOfBirthChange = (e) => {
    const selectedDateString = e.target.value;
    const selectedDate = new Date(selectedDateString);

    if (isNaN(selectedDate)) {
      setDateOfBirth('');
      onChange('');
      setError('Please enter a valid date.');
      setAge(''); // Clear age when invalid date
      return;
    }

    let age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
      age--;
    }

    if (age >= minAge && age <= maxAge) {
      setDateOfBirth(selectedDateString);
      setAge(age);
      onChange(selectedDateString);
      setError('');
    } else {
      setDateOfBirth('');
      onChange('');
      setAge(''); // Clear age when outside valid range
      setError(`Age must be between ${minAge} and ${maxAge} years old.`);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="dateOfBirth" className="block text-gray-700">
        Date of Birth:
      </label>
      <input
        type="date"
        id="dateOfBirth"
        value={dateOfBirth}
        onChange={handleDateOfBirthChange}
        className={`mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : '' 
        }`} // Add border-red-500 for error styling
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {dateOfBirth && ( // Display age only when a valid date is selected
        <div className="mt-2">
          <p>Age: {age} years</p> 
        </div>
      )}
    </div>
  );
};

export default DateOfBirthInput;