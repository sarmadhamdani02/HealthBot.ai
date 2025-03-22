import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect'; // Adjust the path as needed
import User from '@/models/User'; // Adjust the import based on your User model's path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the method is GET and extract email from query
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.query; // Move the destructuring here

  if (typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    await dbConnect(); // Ensure you're connected to the database

    const userData = await User.findOne({ email });
    console.log("Database User Data:", userData); // Log the fetched user data

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove sensitive fields if needed (e.g., password, role, etc.)
    const { _id, firstname, lastname, image } = userData; // Exclude email if not needed
    return res.status(200).json({ _id, firstname, lastname, email, image });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: 'Error fetching user data' });
  }
}
