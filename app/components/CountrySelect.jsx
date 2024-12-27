'use client'
import React, { useEffect, useState } from 'react';

const CountrySelect = ({ onChange }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountryId = e.target.value;
    const selectedCountry = countries.find(
      (country) => country._id === selectedCountryId
    );

    setSelectedCountryId(selectedCountryId);

    // Pass the selected country details to the parent
    onChange({
      countryId: selectedCountryId,
      countryName: selectedCountry?.name || '',
    });
  };

  return (
    <div className="mb-4">
      <label htmlFor="country" className="block text-gray-700">
        Country:
      </label>
      <select
        id="country"
        value={selectedCountryId}
        onChange={handleCountryChange}
        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country._id} value={country._id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;
