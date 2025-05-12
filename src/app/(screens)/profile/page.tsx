// src/app/(screens)/dashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileContext from './ProfileContext';
import dbConnect from '@/lib/dbConnect'; // Ensure the path is correct
import User from '@/models/User'; // Ensure the path is correct

export default async function ProfilePage() {
  // Check for the session cookie on the server side
  const sessionCookie = cookies().get('firebase-session')?.value;

  console.log(sessionCookie);
  // If there's no session, redirect to the login page
  if (!sessionCookie) {
    redirect('/');
  }

  // Connect to the database
  await dbConnect();

  // Fetch user data based on the session cookie (assuming it contains the email)
  let user = null;
  try {
    const email = sessionCookie; // Adjust this if your session cookie structure is different
    user = await User.findOne({ email }).select('-password'); // Exclude password from the result
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  // Render the client component and pass user data as props
  return <ProfileContext user={user} />;
}