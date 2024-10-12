'use client';

import React, { useState, useTransition } from 'react';
import { redirect, useRouter } from 'next/navigation';
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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    startTransition(async () => {
      try {
        const { token } = await signupAction({ firstName, lastName, email, password });
        
        // Set the cookie with the token
        document.cookie = `firebase-session=${token}; path=/;`;

        // Redirect to login after successful sign-up
       redirect("/login")
      } catch (error: any) {
        console.error('Sign-up error:', error.message);
        setError(error.message); // Set error message to state
      }
    });
  };

const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Extract user data from Firebase
    const userData = {
      firstname: user.displayName?.split(' ')[0] || '',
      lastname: user.displayName?.split(' ')[1] || '',
      email: user.email || '',
      image: user.photoURL || '',  // Store the Google profile image URL
      authProviderId: user.uid,    // Store the Google provider UID
    };

    // Get the ID token from Firebase
    const token = await user.getIdToken();

    // Set the cookie with the token
    document.cookie = `firebase-session=${token}; path=/;`;

    // Send user data to your MongoDB API
    const response = await fetch('/api/users/google-signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to save user data to MongoDB');
    }

    // Redirect to dashboard on successful sign-in and save to MongoDB
    router.push('/dashboard');
  } catch (error) {
    console.error('Error signing in with Google:', error);
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
