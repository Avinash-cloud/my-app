'use client'
import React, { useState } from 'react'
import FirstNameInput from './Firstname'
import LastNameInput from './LastNameInput'
import EmailInput from './EmailInput'
import CountrySelect from './CountrySelect'
import GenderRadio from './GenderRadio'
import DateOfBirthInput from './DateOfBirthInput '
const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState(''); 
  const [countryError, setCountryError] = useState('');

  const [gender, setGender] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
  };

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry.country); // Assuming CountrySelect returns an object with country, state, and city
    setState(selectedCountry.state);
    setCity(selectedCountry.city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    // ... your existing validation logic ...

    if (valid) {
      const formData = {
        firstName,
        lastName,
        email,
        country,
        state,
        city,
        gender,
        dob: dateOfBirth,
      };

      console.log('Form Data:', formData); 

      // Here, you would send the formData to your API 
      // ... (your API submission logic) 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit}>
        <FirstNameInput 
          value={firstName} 
          onChange={setFirstName} 
          error={firstNameError} 
        />
        <LastNameInput 
          value={lastName} 
          onChange={setLastName} 
          error={lastNameError} 
        />
        <EmailInput 
          value={email} 
          onChange={setEmail} 
          error={emailError} 
        />
        <CountrySelect 
          value={country} 
          onChange={handleCountryChange} // Pass the updated handleCountryChange
          error={countryError} 
        />
        <GenderRadio onChange={handleGenderChange} />
        <DateOfBirthInput onChange={handleDateOfBirthChange} />

        <button type="submit">Submit</button> 
      </form>
    </div>
  )
}

export default Form;