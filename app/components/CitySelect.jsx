import React, { useEffect, useState } from 'react';

const CitySelect = ({ stateId, onCityChange }) => {
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState('');

  useEffect(() => {
    if (stateId) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/cities/${stateId}`);
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };
      fetchCities();
    } else {
      setCities([]);
      setSelectedCityId('');
    }
  }, [stateId]);

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    const selectedCity = cities.find((city) => city._id === selectedCityId);

    setSelectedCityId(selectedCityId);

    // Pass the selected city details to the parent
    onCityChange({
      cityId: selectedCityId,
      cityName: selectedCity?.name || '',
    });
  };

  return (
    <div className="mb-4">
      {stateId && (
        <div>
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
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CitySelect;
