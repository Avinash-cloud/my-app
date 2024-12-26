'use client'
import React, { useEffect, useState } from 'react';

const CountrySelect = ({ value, onChange, error }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState(value || ''); // Use value prop for initial selection
  const [states, setStates] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedCityId, setSelectedCityId] = useState(''); 
  const [cities, setCities] = useState([]);

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

  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountryId) {
        try {
          const response = await fetch(`http://localhost:5000/api/states/${selectedCountryId}`);
          const data = await response.json();
          setStates(data);
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      } else {
        setStates([]);
      }
    };
    fetchStates();
  }, [selectedCountryId]);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedStateId) {
        try {
          const response = await fetch(`http://localhost:5000/api/cities/${selectedStateId}`); 
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedStateId]);

  const handleCountryChange = async (e) => {
    const selectedCountryId = e.target.value; 
    setSelectedCountryId(selectedCountryId); 
    setSelectedStateId(''); 
    setSelectedCityId(''); 
    setStates([]);
    setCities([]);

    onChange({ countryId: selectedCountryId }); 
  };

  const handleStateChange = async (e) => {
    const selectedStateId = e.target.value; 
    setSelectedStateId(selectedStateId); 
    setSelectedCityId(''); 
    setCities([]);

    onChange({ countryId: selectedCountryId, stateId: selectedStateId }); 
  };

  const handleCityChange = async (e) => {
    const selectedCityId = e.target.value; 
    setSelectedCityId(selectedCityId); 

    onChange({ countryId: selectedCountryId, stateId: selectedStateId, cityId: selectedCityId }); 
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
        {countries.map((country, index) => (
          <option key={index} value={country._id}>
            {country.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {selectedCountryId && (
        <div className="mt-4">
          <label htmlFor="state" className="block text-gray-700">
            State:
          </label>
          <select
            id="state"
            value={selectedStateId} 
            onChange={handleStateChange}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a state</option>
            {states.map((state, index) => (
              <option key={index} value={state._id}> 
                {state.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedStateId && (
        <div className="mt-4">
          <label htmlFor="city" className="block text-gray-700">
            City:
          </label>
          <select
            id="city"
            value={selectedCityId} 
            onChange={handleCityChange} 
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a city</option>
            {cities.map((city, index) => (
              <option key={index} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;