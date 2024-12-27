import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className="bg-blue-500 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-white text-xl font-semibold">
                        My App
                    </div>
                    <div className="space-x-4">
                        <a
                            href="/register"
                            className="text-white hover:text-blue-300 transition-colors"
                        >
                            Register
                        </a>
                        <a
                            href="/view-registered"
                            className="text-white hover:text-blue-300 transition-colors"
                        >
                            View Registered
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar