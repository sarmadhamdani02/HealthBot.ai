import React from 'react';
import { RiGoogleFill } from '@remixicon/react';


const LoginForm = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <header className="w-full flex justify-between p-6">
        <div />
        <h1 className="text-[#00DB0F] text-3xl font-bold absolute top-10 left-[40%] justify-center">Welcome Back!</h1>
        <a href="/" className="text-[#00DB0F] font-semibold absolute top-10 right-10 pl-10">HealthBot</a>
      </header>
      <div className="bg-white w-full max-w-md p-8 rounded-md shadow-md">
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
          />
        </div>
        <button className="mt-6 w-full bg-[#00DB0F] text-white py-2 rounded-lg hover:bg-[#00DB0F]/90 transition duration-200">
          Login
        </button>
        <div className="flex justify-center mt-6">
          <button className="bg-[#00DB0F] p-2 rounded-full">
            <RiGoogleFill className=' text-white w-6 h-auto' />
          </button>
        </div>
        <p className="text-center mt-4 text-gray-600">
          do not have an account?{' '}
          <a href="/signup" className="text-[#00DB0F] font-semibold">sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
