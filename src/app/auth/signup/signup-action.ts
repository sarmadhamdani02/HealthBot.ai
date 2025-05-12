// signup-action.ts
'use server';

import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { hash } from 'bcryptjs';
import { auth } from '../../../lib/firebase'; 
import { createUserWithEmailAndPassword,getIdToken, sendEmailVerification } from 'firebase/auth';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function signupAction({ firstName, lastName, email, password }: SignupData) {
  
  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hash(password, 12);
let token = 'aaa';
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);

    // Get the ID token from Firebase Auth
    token = await getIdToken(user);
  } catch (error) {
    console.error('Error creating user in Firebase:', error);
    throw new Error('Failed to create user in Firebase');
  }

  const newUser = await User.create({
    firstname: firstName,
    lastname: lastName,
    email,
    password: hashedPassword,
  });

  // Return a plain object
  return {
    id: newUser._id.toString(), // Convert ObjectId to string
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    email: newUser.email,
    token:token
  };
}
