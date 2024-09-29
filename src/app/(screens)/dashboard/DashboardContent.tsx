// src/app/(screens)/dashboard/DashboardContent.tsx
"use client"; // Mark this as a Client Component

import React, { useState } from 'react';
import Link from 'next/link';
import SideNavbar from '@/components/Drawer';
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowLeftSLine } from '@remixicon/react';

const DashboardContent = () => {
    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <>
            {/* SideNavbar */}
            {showDrawer && (
                <div className="fixed inset-0 z-40">
                    <SideNavbar />
                </div>
            )}

            {/* Header */}
            <header className="flex justify-between items-center py-4 relative z-50">
                {/* Conditional rendering of icons */}
                {showDrawer ? (
                    <RiArrowLeftSLine
                        className="text-[#00DB0F] cursor-pointer hover:text-[#00db0fc7] w-6 h-auto absolute left-4 top-4 z-50"
                        onClick={() => setShowDrawer(false)}
                    />
                ) : (
                    <GiHamburgerMenu
                        className="text-[#00DB0F] cursor-pointer hover:text-[#00db0fc7] w-6 h-auto absolute left-4 top-4 z-50"
                        onClick={() => setShowDrawer(true)}
                    />
                )}

                <h1 className="text-[#00DB0F] text-3xl font-bold z-100 mx-auto md:absolute md:left-[50%] md:transform md:-translate-x-[50%]">HealthBot</h1>
                <span className="text-[#00DB0F] text-xl absolute right-4 top-4 z-50">UserName</span>
            </header>

            {/* Main content */}
            <section className="flex flex-col items-center z-10">
                {/* Cards Section */}
                <div className="flex flex-wrap justify-center gap-4 mb-8 mt-8 w-full">
                    {Array(3).fill(null).map((_, i) => (
                        <div key={i} className="w-full sm:w-1/2 lg:w-1/3 bg-[#00DB0F] text-white p-4 rounded-lg flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-white overflow-hidden mb-4">
                                <img
                                    src="https://via.placeholder.com/80"
                                    alt="Doctor"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-lg font-semibold">Dr. Kamlesh</h2>
                            <p className="text-sm text-center">street no 1 z colony<br />1.5km</p>
                            <p className="mt-2 text-xl font-bold">13-8-24</p>
                        </div>
                    ))}
                </div>

                {/* Chat Section */}
                <div className="w-full max-w-md bg-[#C7FECF] p-6 rounded-lg">
                    <h2 className="text-[#00DB0F] text-lg font-semibold mb-4">Start from where you left</h2>
                    <div className="flex flex-col gap-4">
                        {['What is computer', 'Chat1', 'Chat1'].map((text, index) => (
                            <div key={index} className="flex justify-between items-center bg-[#00DB0F] text-white p-3 rounded-lg">
                                <span>{text}</span>
                                <button className="bg-white text-[#00DB0F] py-2 px-4 rounded-lg">Go to chat</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Links */}
            <div className='text-[#00DB0F] flex flex-wrap justify-center gap-4 mt-8'>
                <Link className='hover:underline' href={'/dashboard'}>Dashboard</Link>
                <Link className='hover:underline text-black' href={'/chatscreen'}>Chat Screen</Link>
                <Link className='hover:underline' href={'/doctorscreen'}>Doctor Screen</Link>
                <Link className='hover:underline text-black' href={'/profile'}>Profile</Link>
                <Link className='hover:underline' href={'/login'}>Login</Link>
                <Link className='hover:underline' href={'/signup'}>Signup</Link>
                <Link className='hover:underline' href={'/OTP'}>OTP Screen</Link>
            </div>
        </>
    );
};

export default DashboardContent;
