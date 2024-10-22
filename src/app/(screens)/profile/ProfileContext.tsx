// src/app/(screens)/dashboard/ProfileContext.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth'; 
import { auth } from "@/lib/firebase"; 
import { useRouter } from 'next/navigation';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  image?: string;
}

interface ProfileContextProps {
  user: User | null; // Accept user as a prop
}

const ProfileContext: React.FC<ProfileContextProps> = ({ user }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser ) => {
      if (!currentUser ) {
        console.log('No user is signed in.');
        router.push('/login'); // Redirect to login if not signed in
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      // Clear all cookies in the browser
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <header className="flex justify-between items-center py-4">
        <button className="text-[#00DB0F] text-2xl">
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-[#00DB0F] text-3xl font-bold">HealthBot</h1>
        <span className="text-[#00DB0F] text-xl">
          <button onClick={handleLogout}>Logout</button>
        </span>
      </header>

      <div className="bg-white w-full max-w-md p-8 rounded-md shadow-md flex flex-col items-center">
        <img
          src={user.image}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full border-2 border-[#00DB0F] mb-4" 
        />
        <h2 className="text-xl font-semibold text-[#00DB0F]">{`${user.firstname} ${user.lastname}`}</h2>
        <p className="text-gray-600">{user.email}</p>

        <button
          onClick={() => alert('Edit Profile Clicked')} 
          className="mt-6 w-full bg-[#00DB0F] text-white py-2 rounded-lg hover:bg-[#00DB0F]/90 transition duration-200"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileContext;