import React from 'react'
import AllUsers from '../components/AllUsers';
import Navbar from '../components/Navbar';

const page = async () => {
    const response = await fetch('http://localhost:5000/api/allusers');
    const users = await response.json();
    // console.log(users);


    return (
        <>
        <Navbar/>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">User Information</h1>
                <AllUsers users={users} />
            </div>
        </>
    )
}

export default page