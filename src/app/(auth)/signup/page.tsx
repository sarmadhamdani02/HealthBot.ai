import React from 'react';

const SignUpForm = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <header className="w-full flex justify-between p-6">
        <div />
        <h1 className="text-[#00DB0F] text-3xl font-bold">Create an account</h1>
        <a href="/" className="text-[#00DB0F] font-semibold">HealthBot</a>
      </header>
      <div className="bg-white w-full max-w-md p-8 rounded-md shadow-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="First name"
              className="border border-green-500 rounded-lg px-4 py-2 w-full text-green-500 placeholder-green-400 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Last name"
              className="border border-green-500 rounded-lg px-4 py-2 w-full text-green-500 placeholder-green-400 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <input
            type="email"
            placeholder="Enter email"
            className="border border-green-500 rounded-lg px-4 py-2 w-full text-green-500 placeholder-green-400 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="border border-green-500 rounded-lg px-4 py-2 w-full text-green-500 placeholder-green-400 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-green-500 rounded-lg px-4 py-2 w-full text-green-500 placeholder-green-400 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200">
          Sign up
        </button>
        <div className="flex justify-center mt-6">
          <button className="bg-green-500 p-2 rounded-full">
            <img src="https://via.placeholder.com/40" alt="G logo" />
          </button>
        </div>
        <p className="text-center mt-4 text-gray-600">
          already have an account?{' '}
          <a href="/login" className="text-[#00DB0F] font-semibold">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
