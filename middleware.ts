// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export async function middleware(request: NextRequest) {
//   const cookieStore = cookies(); // Use the cookies() helper instead of req.cookies
//   const sessionCookie = cookieStore.get('firebase-session')?.value; // Access the session cookie
//   const { pathname } = request.nextUrl; // Get the URL of the request

//   // Redirect logged-in users away from the login page
//   if (pathname === '/login' && sessionCookie) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }
//   if (pathname === '/signup' && sessionCookie) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }
//   // Redirect non-authenticated users away from the dashboard page
//   if (pathname === '/dashboard' && !sessionCookie) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/login', '/dashboard'], // Match the routes that need protection
// };
