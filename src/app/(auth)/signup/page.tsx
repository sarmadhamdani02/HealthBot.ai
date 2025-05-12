import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignUpContext from './signupContext';

export default function LoginPage() {
  // Check for the session cookie
  const sessionCookie = cookies().get('firebase-session')?.value;
  
  console.log(sessionCookie);

  // If there's a session, redirect to the dashboard
  if (sessionCookie) {
    redirect('/dashboard');
  }

  // Render the client component if not logged in
  return <SignUpContext />;
}

