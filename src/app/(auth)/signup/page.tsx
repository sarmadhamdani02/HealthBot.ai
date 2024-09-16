import React from 'react';
import { RiGoogleFill } from '@remixicon/react';
import { register } from '@/action/user';
import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { getSession } from 'next-auth/react';

const SignUpForm = async() => {
  // const session= await getSession();
  // console.log('***********', session);
  // const user = session?.user;
  // if(user) redirect('/');
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
        <form action={register}>
        <div>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="First name"
              name="firstname"
              className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastname"
              className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
            />
          </div>
          <input
            type="email"
            placeholder="Enter email"
            className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
            name="email"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
            name="password"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
            name="confirmpassword"
         />
        </div>
        
        <button className="mt-6 w-full bg-[#00DB0F] text-white py-2 rounded-lg hover:bg-[#00DB0F]/90 transition duration-200">
          Sign up
        </button>
        </div>
        </form>
        <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <div className="flex justify-center mt-6">
          <button className="bg-[#00DB0F] p-2 rounded-full">
          <RiGoogleFill className=' text-white w-6 h-auto' />
          </button>
        </div>
        </form>
        <p className="text-center mt-4 text-gray-600">
          already have an account?{' '}
          <a href="/login" className="text-[#00DB0F] font-semibold">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
