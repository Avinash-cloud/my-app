import React, { useEffect, useState } from 'react';

const StateSelect = ({ countryId, onStateChange }) => {
  const [states, setStates] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState('');

  useEffect(() => {
    if (countryId) {
      const fetchStates = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/states/${countryId}`);
          const data = await response.json();
          setStates(data);
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      };
      fetchStates();
    } else {
      setStates([]);
      setSelectedStateId('');
    }
  }, [countryId]);

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    const selectedState = states.find((state) => state._id === selectedStateId);

    setSelectedStateId(selectedStateId);

    // Pass the selected state details to the parent
    onStateChange({
      stateId: selectedStateId,
      stateName: selectedState?.name || '',
    });
  };

  return (
    <div className="mb-4">
      {countryId && (
        <div>
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
            {states.map((state) => (
              <option key={state._id} value={state._id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default StateSelect;
