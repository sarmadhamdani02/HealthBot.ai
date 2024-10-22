// src/app/api/users/getUser.ts
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect'; // Ensure you have this connection utility
import User from '../../../models/User'; // Adjust the path to your User model

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email'); // Get email from query parameters

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    await dbConnect(); // Ensure you're connected to the database
    const user = await User.findOne({ email }).select('-password'); // Exclude password from response

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
