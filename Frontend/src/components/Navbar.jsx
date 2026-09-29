import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import logo from '../assets/logo.png'

const Navbar = () => {
    const { navigate, user, logout } = useAppContext();
    const [showProfile, setShowProfile] = useState(false);

    return (
        <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
            <img
                src={logo}
                alt="GenBlog Logo"
                onClick={() => navigate('/')}
                className="h-12 w-auto cursor-pointer"
            />

            <div className='flex items-center gap-4'>
                {user?.role === 'admin' && (
                    <button
                        onClick={() => navigate('/admin')}
                        className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'
                    >
                        Admin Dashboard
                        <img src={assets.arrow} alt="arrow" />
                    </button>
                )}

                <div className='relative'>
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className='w-10 h-10 rounded-full bg-primary text-white font-semibold cursor-pointer'
                    >
                        {user?.name?.charAt(0).toUpperCase()}
                    </button>

                    {showProfile && (
                        <div className='absolute right-0 top-12 w-64 bg-white border shadow-lg rounded-lg p-4 z-50'>
                            <p className='font-semibold text-gray-800'>
                                {user?.name}
                            </p>

                            <p className='text-sm text-gray-500 break-all mt-1'>
                                {user?.email}
                            </p>

                            <button
                                onClick={logout}
                                className='w-full mt-4 bg-primary text-white rounded py-2 text-sm cursor-pointer'
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar