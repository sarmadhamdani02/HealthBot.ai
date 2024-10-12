import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { signOut } from 'firebase/auth'; 
import { auth } from "@/lib/firebase"; 
import { useRouter } from 'next/navigation';

const ChatscreenContext = () => {
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
};
  const sessionCookie = cookies().get('firebase-session')?.value;
console.log(sessionCookie);
  // If there's no session, redirect to the login page
  if (!sessionCookie) {
    redirect('/');
  }
  else{
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white p-4">
      <header className="flex justify-between items-center py-4">
        <button className="text-[#00DB0F] text-2xl">
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-[#00DB0F] text-3xl font-bold">HealthBot</h1>
        <span className="text-[#00DB0F] text-xl"><button onClick={handleLogout}>Logout</button></span>
      </header>

      {/* Footer Input Section */}
      <footer className="w-full">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-3xl flex items-center border-2 border-[#00DB0F] rounded-full p-2">
            <input 
              type="text" 
              placeholder="Enter your Prompt...." 
              className="flex-grow px-4 py-2 focus:outline-none text-[#00DB0F] placeholder-[#C7FECF]"
            />
            <button className="bg-[#00DB0F] text-white p-2 rounded-full">
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
};

export default ChatscreenContext;