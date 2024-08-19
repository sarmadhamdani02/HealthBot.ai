import React from 'react';
import Link from 'next/link';
import SideNavbar from '@/components/Drawer';


const HealthBotDashboard = () => {
    return (
        <div className="min-h-screen bg-white p-4">
            <SideNavbar/>
            <header className="flex justify-between items-center py-4">
            
                <button className="text-[#00DB0F] text-2xl">
                    <i className="fas fa-bars"></i>
                </button>
                
                <h1 className="text-[#00DB0F]  absolute left-[40%] text-3xl font-bold">HealthBot</h1>
                <span className="text-[#00DB0F] text-xl">UserName</span>
            </header>
           
            <section className="flex flex-col items-center">
                {/* Cards Section */}
                <div className="flex flex-wrap justify-center gap-4 mb-8 mt-8">
                    {Array(3).fill(null).map((_, i) => (
                        <div key={i} className="w-64 bg-[#00DB</section>0F] text-white p-4 rounded-lg flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-white overflow-hidden mb-4">
                                <img
                                    src="https://via.placeholder.com/80"
                                    alt="Doctor"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-lg font-semibold">Dr. Kamlesh</h2>
                            <p className="text-sm">street no 1 z colony<br />1.5km</p>
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

            <div className=' text-[#00DB0F] '>
                <Link className='hover:underline' href={'/dashboard'}>Dashboard </Link>
                <Link className='hover:underline text-black' href={'/chatscreen'}>Chat Screen </Link>
                <Link className='hover:underline ' href={'/doctorscreen'}>Doctor Screen </Link>
                <Link className='hover:underline text-black ' href={'/profile'}>Profile </Link>
                <Link className='hover:underline ' href={'/login'}>Login </Link>
                <Link className='hover:underline ' href={'/signup'}>Signup </Link>
                <Link className='hover:underline ' href={'/OTP'}>OTP Screen </Link>
            </div>
        </div>
    );
};

export default HealthBotDashboard;