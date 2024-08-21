import React from 'react';

const HealthBotDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white p-4">
      <header className="flex justify-between items-center py-4">
        <button className="text-[#00DB0F] text-2xl">
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-[#00DB0F] text-3xl font-bold">HealthBot</h1>
        <span className="text-[#00DB0F] text-xl">UserName</span>
      </header>

      {/* Footer Input Section */}
      <footer className="w-full">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-3xl flex items-center border-2 border-[#00DB0F] rounded-full p-2">
            <input 
              type="text" 
              placeholder="Enter your Prompt...." 
              className="flex-grow px-4 py-2 focus:outline-none text-[#00DB0F] placeholder-[#C7FECF]"
            />
            <button className="bg-[#00DB0F] text-white p-2 rounded-full">
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthBotDashboard;