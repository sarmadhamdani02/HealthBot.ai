"use client"
import React from 'react';
import { signOut } from 'firebase/auth'; 
import { auth } from "@/lib/firebase"; 
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
 
const DoctorContext = () => {
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

      {/* Search Input */}
      <section className="flex flex-col items-center my-4">
        
        <h2 className="text-[#00DB0F] text-lg font-semibold mt-4">Nearby</h2>
      </section>

      {/* Doctor Cards */}
      <section className="flex flex-col items-center gap-4">
        {Array(3).fill(null).map((_, i) => (
          <div key={i} className="w-full max-w-2xl flex items-center bg-[#00DB0F] text-white p-4 rounded-lg">
            <div className="w-20 h-20 rounded-full bg-white overflow-hidden">
              <img
                src="https://via.placeholder.com/80"
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow ml-4">
              <h2 className="text-lg font-semibold">Dr. Kamlesh</h2>
              <p className="text-sm">street no 1 z colony</p>
              <div className="flex items-center mt-2">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt text-xl mr-2"></i>
              <span>1.5km</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
 

export default DoctorContext;
