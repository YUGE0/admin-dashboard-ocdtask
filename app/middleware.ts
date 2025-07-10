import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth');

  const isLoggedIn = authCookie?.value === 'true';
  const { pathname } = request.nextUrl;

  if (!isLoggedIn && pathname !== '/login' && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/',            
    '/Login',
    '/dashboard/:path*',  
    '/cars/:path*'        
  ],
};
