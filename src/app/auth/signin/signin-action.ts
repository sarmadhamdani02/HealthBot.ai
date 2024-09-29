'use server';

import { auth } from '../../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface SignInData {
  email: string;
  password: string;
}

export async function signinAction({ email, password }: SignInData) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Return a plain object instead of userCredential.user
    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      // Include any other properties you need
    };
  } catch (error) {
    console.error('Sign-in error:', error);
    throw new Error('Failed to sign in');
  }
}
