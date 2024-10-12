// src/app/(screens)/dashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardContent from './DashboardContent';
 // Import the client component

export default function DashboardPage() {
  // Check for the session cookie on the server side
  const sessionCookie = cookies().get('firebase-session')?.value;
console.log(sessionCookie);
  // If there's no session, redirect to the login page
  if (!sessionCookie) {
    redirect('/');
  }

  // Render the client component
  return <DashboardContent />;
}
