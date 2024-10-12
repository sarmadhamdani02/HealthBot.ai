// app/api/users/google-signup/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { firstname, lastname, email, image, authProviderId } = await req.json();

    // Check if the user already exists based on email or authProviderId
    const existingUser = await User.findOne({ $or: [{ email }, { authProviderId }] });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 200 });
    }

    // Create a new user in MongoDB
    const newUser = new User({
      firstname,
      lastname,
      email,
      image,
      authProviderId,
    });

    await newUser.save();

    return NextResponse.json({ message: 'User saved to MongoDB' }, { status: 201 });
  } catch (error) {
    console.error('Error saving user to MongoDB:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
