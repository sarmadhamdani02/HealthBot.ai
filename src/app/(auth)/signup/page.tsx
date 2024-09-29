'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../lib/firebase';
import { RiGoogleFill } from '@remixicon/react';
import { signupAction } from '@/app/auth/signup/signup-action';

export default function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null); // Add error state
  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null); // Reset error state
  startTransition(async () => {
    try {
      const user = await signupAction({ firstName, lastName, email, password });
      console.log(user); // This should now log a plain object
      router.push('/login');
    } catch (error: any) {
      console.error('Sign-up error:', error.message);
      setError(error.message); // Set error message to state
    }
  });
};


  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Handle Google sign-in errors
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <header className="w-full flex justify-between p-6">
        <div />
        <h1 className="text-[#00DB0F] text-3xl font-bold">Create an account</h1>
        <a href="/" className="text-[#00DB0F] font-semibold">HealthBot</a>
      </header>
      <div className="bg-white w-full max-w-md p-8 rounded-md shadow-md">
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First name"
                className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last name"
                className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Enter email"
              className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="mt-6 w-full bg-[#00DB0F] text-white py-2 rounded-lg hover:bg-[#00DB0F]/90 transition duration-200">
            {isPending ? 'Signing up...' : 'Sign up'}
          </button>
        </form>

        <div className="flex justify-center mt-6">
          <button onClick={handleGoogleSignIn} className="bg-[#00DB0F] p-2 rounded-full">
            <RiGoogleFill className="text-white w-6 h-auto" />
          </button>
        </div>

        <p className="text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-[#00DB0F] font-semibold">Log in</a>
        </p>
      </div>
    </div>
  );
}
