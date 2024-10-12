// src/app/(screens)/dashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
 import ProfileContext from './ProfileContext';
 // Import the client component

export default function ProfilePage() {
  // Check for the session cookie on the server side
  const sessionCookie = cookies().get('firebase-session')?.value;
console.log(sessionCookie);
  // If there's no session, redirect to the login page
  if (!sessionCookie) {
    redirect('/');
  }

  // Render the client component
  return <ProfileContext />;
}
