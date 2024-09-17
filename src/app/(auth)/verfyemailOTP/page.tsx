import React from 'react';

const OTPForm = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <header className="w-full flex justify-between p-6">
        <div />
        <h1 className="text-[#00DB0F] text-3xl font-bold  absolute top-10 left-[40%]">Reset Password</h1>
        <a href="/" className="text-[#00DB0F] font-semibold absolute top-10 right-10">HealthBot</a>
      </header>
      <div className="bg-white w-full max-w-sm p-8 rounded-md shadow-md text-center">
        <h2 className="text-gray-700 text-lg font-medium mb-4">Enter OTP</h2>
        <div className="flex justify-center space-x-4 mb-6">
          {Array(6)
            .fill('')
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="border border-[#00DB0F] rounded-lg text-center w-12 h-12 focus:outline-none focus:ring-2 focus:ring-[#00DB0F] text-lg text-green-500"
              />
            ))}
        </div>
        <button className="w-full bg-[#00DB0F] text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">
          Verify
        </button>
      </div>
    </div>
  );
};

export default OTPForm;