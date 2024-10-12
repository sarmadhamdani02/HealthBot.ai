// src/app/auth/signin/signin-action.ts
'use server';

import { auth } from '../../../lib/firebase';
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { setCookie } from 'nookies'; // Import nookies for cookie management


interface SignInData {
  email: string;
  password: string;
}

export async function signinAction({ email, password }: SignInData) {
  let token = 'aaa';
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Get the ID token
    token = await getIdToken(user);

    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      token:token, // Include the ID token in the response
      redirect: '/dashboard', // Redirect to the dashboard after successful sign-in
    };
  } catch (error) {
    console.error('Sign-in error:', error);
    throw new Error('Failed to sign in');
  }
}
