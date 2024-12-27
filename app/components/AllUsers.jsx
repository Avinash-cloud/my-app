import React from 'react';

const AllUsers = ({ users }) => {
    // console.log(users);

    function formatDateToReadable(dateString) {
        const date = new Date(dateString);
      
        return date.toLocaleDateString('en-US', {
          weekday: 'long',  // e.g., "Thursday"
          year: 'numeric',  // e.g., "2000"
          month: 'long',    // e.g., "January"
          day: 'numeric',   // e.g., "27"
        });
      }
    
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-200 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Country</th>
            <th className="border border-gray-300 px-4 py-2">State</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">Gender</th>
            <th className="border border-gray-300 px-4 py-2">Date of Birth</th>
            <th className="border border-gray-300 px-4 py-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.country}</td>
              <td className="border border-gray-300 px-4 py-2">{user.state}</td>
              <td className="border border-gray-300 px-4 py-2">{user.city}</td>
              <td className="border border-gray-300 px-4 py-2">{user.gender}</td>
              <td className="border border-gray-300 px-4 py-2">{formatDateToReadable(user.dob)}</td>
              <td className="border border-gray-300 px-4 py-2">{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
