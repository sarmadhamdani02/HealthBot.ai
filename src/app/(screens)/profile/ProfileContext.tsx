"use client"
import React from 'react';
import { signOut } from 'firebase/auth'; 
import { auth } from "@/lib/firebase"; 
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
 
const ProfileContext = () => {
  const router = useRouter();

  const handleLogout = async () => {
     try {
        // Clear all cookies in the browser
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        await signOut(auth);
        router.push('/login')
        console.log("line after signOut")

        redirect('/login'); 
    } catch (error) {
        console.error("Logout error: ", error);
    }
    
    }
 
      
    
  return (
    <div className="min-h-screen bg-white p-4">
      <header className="flex justify-between items-center py-4">
        <button className="text-[#00DB0F] text-2xl">
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-[#00DB0F] text-3xl font-bold">HealthBot</h1>
        <span className="text-[#00DB0F] text-xl"><button onClick={handleLogout}>Logout</button></span>
        
      </header>
 
    </div>
  );
};
 

export default ProfileContext;
