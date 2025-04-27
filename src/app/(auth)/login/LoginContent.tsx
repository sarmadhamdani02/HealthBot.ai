'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { RiGoogleFill } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../lib/firebase';
import { signinAction } from '@/app/auth/signin/signin-action';
import Logo from '@/app/components/logo'; // Import the Logo component

const LoginContent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter();

  // Check if the user is already logged in and redirect to dashboard if so
  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)firebase-session\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    startTransition(async () => {
      try {
        const { token, user } = await signinAction({ email, password });

        // Set the cookie with the token
        document.cookie = `firebase-session=${token}; path=/`;

        // Log the user data to the console
        console.log('Logged in with email:');
        console.log('Email:', email);
        console.log('User Info:', user); // Log full user information

        // Redirect to dashboard
        router.push('/dashboard');
      } catch (error: any) {
        console.error('Login error:', error.message);
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

      // Log the user data to the console before redirecting
      console.log('Logged in with Google:');
      console.log('First Name:', userData.firstname);
      console.log('Last Name:', userData.lastname);
      console.log('Email:', userData.email);
      console.log('Image URL:', userData.image);
      console.log('Auth Provider ID:', userData.authProviderId);

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
        <Logo /> {/* Include the Logo component */}
        <a href="/" className="text-[#00DB0F] font-semibold absolute top-10 right-10 pl-10">HealthBot</a>
      </header>

      <div className="bg-white w-full max-w-md p-8 rounded-md shadow-md">
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <form onSubmit={handleEmailSignIn}>
          <div className="space-y-4">
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isPending} className="mt-6 w-full bg-[#00DB0F] text-white py-2 rounded-lg hover:bg-[#00DB0F]/90 transition duration-200">
            {isPending ? 'Signing in...' : 'Sign in with Email'}
          </button>
        </form>
        <button className="text-[#00DB0F]" onClick={() => router.push("/forgot-password")}>Forgot password?</button>

        <div className="flex justify-center mt-6">
          <button onClick={handleGoogleSignIn} className="bg-[#00DB0F] p-2 rounded-full">
            <RiGoogleFill className='text-white w-6 h-auto' />
          </button>
        </div>

        <p className="text-center mt-4 text-gray-600">
          Do not have an account?{' '}
          <a href="/signup" className="text-[#00DB0F] font-semibold">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginContent;
