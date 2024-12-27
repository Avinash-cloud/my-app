'use client'
import React, { useState } from 'react'
import FirstNameInput from './Firstname'
import LastNameInput from './LastNameInput'
import EmailInput from './EmailInput'
import CountrySelect from './CountrySelect'
import GenderRadio from './GenderRadio'
import DateOfBirthInput from './DateOfBirthInput '
import StateSelect from './StateSelect';
import CitySelect from './CitySelect';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dateOfBirth: '',
  });

  const {
    firstName,
    lastName,
    email,
    country,
    state,
    city,
    gender,
    dateOfBirth,
  } = formData;

  const handleFirstNameChange = (value) => {
    setFormData({ ...formData, firstName: value });
  };

  const handleLastNameChange = (value) => {
    setFormData({ ...formData, lastName: value });
  };

  const handleEmailChange = (value) => {
    setFormData({ ...formData, email: value });
  };

  const handleCountrySelectChange = (selectedLocation) => {
    setFormData({
      ...formData,
      country: selectedLocation.countryName,
      countryId: selectedLocation.countryId,
      state: '',
      stateId: '',
      city: '',
      cityId: '',
    });
  };

  const handleStateChange = (selectedLocation) => {
    setFormData({
      ...formData,
      state: selectedLocation.stateName,
      stateId: selectedLocation.stateId,
      city: '',
      cityId: '',
    });
  };

  const handleCityChange = (selectedLocation) => {
    setFormData({
      ...formData,
      city: selectedLocation.cityName,
      cityId: selectedLocation.cityId,
    });
  };

  const handleGenderChange = (selectedGender) => {
    setFormData({ ...formData, gender: selectedGender });
  };

  const handleDateOfBirthChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation function
    const validateForm = () => {
      const errors = [];
  
      // First Name: Must accept alphabets only
      if (!/^[A-Za-z]+$/.test(firstName)) {
        errors.push("First Name must contain alphabets only.");
      }
  
      // Last Name: Must accept alphabets only
      if (!/^[A-Za-z]+$/.test(lastName)) {
        errors.push("Last Name must contain alphabets only.");
      }
  
      // Email: Must be in valid email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Invalid email format.");
      }
  
      // Country: Must be selected from the list
      if (!country) {
        errors.push("Country is required.");
      }
  
      // State: Must be selected and valid for the selected country
      if (!state) {
        errors.push("State is required.");
      }
  
      // City: Must be selected and valid for the selected state
      if (!city) {
        errors.push("City is required.");
      }
  
      // Gender: Must be selected
      if (!gender) {
        errors.push("Gender is required.");
      }
  
      // Date of Birth: Must be older than 14 years and less than 99 years
      const currentDate = new Date();
      const dobDate = new Date(dateOfBirth);
      const age = currentDate.getFullYear() - dobDate.getFullYear();
      const ageCheck = age - (dobDate > new Date(currentDate.setFullYear(currentDate.getFullYear() - age)) ? 1 : 0);
  
      if (ageCheck < 14 || ageCheck > 99) {
        errors.push("Date of Birth must make the age between 14 and 99 years.");
      }
  
      return errors;
    };
  
    // Run validation
    const validationErrors = validateForm();
  
    if (validationErrors.length > 0) {
      alert("Form submission failed due to the following errors:\n" + validationErrors.join("\n"));
      return;
    }
  
    // If validation passes, transform data
    const transformedData = {
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dob: dateOfBirth, // Renamed dateOfBirth to dob
      age: new Date().getFullYear() - new Date(dateOfBirth).getFullYear(), // Calculate Age
    };
  
    console.log("Transformed Data:", transformedData);
  
    // Send data to API
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("User data submitted successfully!");
        console.log("API Response:", result);
      } else {
        const error = await response.json();
        alert("Failed to submit data. " + (error.message || "Please try again."));
        console.error("API Error:", error);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Failed to submit data due to a network error. Please try again later.");
    }
  };
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">User Information Form</h2>

    <div className="space-y-4">
      <FirstNameInput
        value={firstName}
        onChange={handleFirstNameChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <LastNameInput
        value={lastName}
        onChange={handleLastNameChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <EmailInput
        value={email}
        onChange={handleEmailChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <CountrySelect
        onChange={handleCountrySelectChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <StateSelect
        countryId={formData.countryId}
        onStateChange={handleStateChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <CitySelect
        stateId={formData.stateId}
        onCityChange={handleCityChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <GenderRadio onChange={handleGenderChange} />
      <DateOfBirthInput
        onChange={handleDateOfBirthChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Submit
    </button>
  </form>
</div>

  )
}

export default Form;
