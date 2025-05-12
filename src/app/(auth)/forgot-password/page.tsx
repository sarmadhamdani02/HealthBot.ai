// src/app/(auth)/forgot-password/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ForgotContext from './forgotContext';

export default function ForgotPassword() {
  // Check for the session cookie
  const sessionCookie = cookies().get('firebase-session')?.value;
  
  console.log(sessionCookie);

  // If there's a session, redirect to the dashboard
  if (!sessionCookie) {
    redirect('/');
  }

  // Render the client component if not logged in
  return <ForgotContext />;
}
























