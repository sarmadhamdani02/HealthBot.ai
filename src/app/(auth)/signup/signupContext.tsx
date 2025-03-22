'use client';

import React, { useState, useTransition } from 'react';
import { RiGoogleFill } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../lib/firebase';

const SignupContent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    startTransition(async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed up:', user);
        document.cookie = `firebase-session=${await user.getIdToken()}; path=/`;
        router.push('/dashboard');
      } catch (error: any) {
        console.error('Signup error:', error.message);
        setError(error.message);
      }
    });
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google signup successful:', user);
      document.cookie = `firebase-session=${await user.getIdToken()}; path=/`;
      router.push('/dashboard');
    } catch (error) {
      console.error('Google signup error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <header className="w-full flex justify-between p-6">
        <div />
        <h1 className="text-[#00DB0F] text-3xl font-bold absolute top-10 left-[40%]">Create an Account</h1>
        <a href="/" className="text-[#00DB0F] font-semibold absolute top-10 right-10 pl-10">HealthBot</a>
      </header>

      <div className="bg-white w-full max-w-md p-8 rounded-md shadow-md">
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleEmailSignup}>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter Email"
              className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] focus:ring-2 focus:ring-[#00DB0F]"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] focus:ring-2 focus:ring-[#00DB0F]"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] focus:ring-2 focus:ring-[#00DB0F]"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isPending} className="mt-6 w-full bg-[#00DB0F] text-white py-2 rounded-lg hover:bg-[#00DB0F]/90 transition duration-200">
            {isPending ? 'Signing up...' : 'Sign up with Email'}
          </button>
        </form>

        <div className="flex justify-center mt-6">
          <button onClick={handleGoogleSignup} className="bg-[#00DB0F] p-2 rounded-full">
            <RiGoogleFill className='text-white w-6 h-auto' />
          </button>
        </div>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-[#00DB0F] font-semibold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupContent;
