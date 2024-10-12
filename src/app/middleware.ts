// src/app/middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin'; // Ensure correct import

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token'); // Get the token from cookies

  try {
    const user = token ? await adminAuth.verifyIdToken(token.value) : null;
console.log("user data from middleware is: "+user);
    // Check if the user is signed in
    if (user) {
      // User is signed in
      if (pathname === '/login' || pathname === '/signup' || pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', req.url)); // Redirect to dashboard
      }
    } else {
      // User is not signed in
      if (pathname === '/dashboard' || pathname === '/profile') {
        return NextResponse.redirect(new URL('/', req.url)); // Redirect to home
      }
    }
  } catch (error) {
    console.error('Error verifying token:', error);
  }

  return NextResponse.next(); // Proceed to the requested route
}

export const config = {
  matcher: ['/login', '/signup', '/dashboard', '/profile', '/'], // Add other routes to protect
};
