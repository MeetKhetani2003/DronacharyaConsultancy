import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super_secret_jwt_key_12345');
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Prevent logged in admin from seeing login page again
  if (request.nextUrl.pathname === '/admin/login' && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super_secret_jwt_key_12345');
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } catch (error) {
      // Invalid token, allow access to login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
